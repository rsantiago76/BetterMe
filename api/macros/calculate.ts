/**
 * POST /api/macros/calculate
 * 
 * Calculate personalized macros based on user profile
 * Free tier: Returns calculation without saving
 * Pro tier: Can save profile to database
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import { authenticateRequest } from '../lib/auth';
import { query, queryOne } from '../lib/db';
import { 
  calculateBMR, 
  calculateTDEE, 
  calculateMacros,
  type UserProfile as CalcProfile,
  type MacroResult 
} from '../../src/utils/macro-calculator';

interface CalculateRequest {
  profile: {
    age: number;
    gender: 'male' | 'female';
    weight_lbs: number;
    height_inches: number;
    activity_level: string;
    goal: string;
  };
  saveProfile?: boolean;
  profileName?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { profile, saveProfile, profileName }: CalculateRequest = req.body;
    
    // Validate input
    if (!profile || !profile.age || !profile.gender || !profile.weight_lbs || !profile.height_inches) {
      return res.status(400).json({ error: 'Missing required profile fields' });
    }
    
    // Calculate macros
    const calcProfile: CalcProfile = {
      age: profile.age,
      gender: profile.gender,
      weight_lbs: profile.weight_lbs,
      height_inches: profile.height_inches,
      activity_level: profile.activity_level,
      goal: profile.goal,
    };
    
    const bmr = calculateBMR(calcProfile);
    const tdee = calculateTDEE(bmr, profile.activity_level);
    const macros = calculateMacros(tdee, profile.goal);
    
    const result: MacroResult = {
      bmr,
      tdee,
      targetCalories: macros.calories,
      protein: macros.protein_g,
      carbs: macros.carbs_g,
      fat: macros.fat_g,
    };
    
    // If saveProfile is requested, check auth and tier
    if (saveProfile) {
      const user = await authenticateRequest(req);
      
      if (!user) {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'You must be logged in to save profiles',
        });
      }
      
      // Check tier - only Pro and Team can save
      if (user.tier === 'free') {
        return res.status(403).json({ 
          error: 'Forbidden',
          message: 'Saving profiles requires Pro tier. Upgrade to save unlimited profiles.',
          requiredTier: 'pro',
        });
      }
      
      // Save to database
      const savedProfile = await queryOne(`
        INSERT INTO user_profiles (
          user_id, name, age, gender, weight_lbs, height_inches, 
          activity_level, goal, bmr, tdee, target_calories,
          target_protein_g, target_carbs_g, target_fat_g
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING id, created_at
      `, [
        user.userId,
        profileName || 'My Profile',
        profile.age,
        profile.gender,
        profile.weight_lbs,
        profile.height_inches,
        profile.activity_level,
        profile.goal,
        bmr,
        tdee,
        macros.calories,
        macros.protein_g,
        macros.carbs_g,
        macros.fat_g,
      ]);
      
      return res.status(200).json({
        success: true,
        result,
        saved: true,
        profileId: savedProfile.id,
      });
    }
    
    // Return calculation without saving
    return res.status(200).json({
      success: true,
      result,
      saved: false,
    });
    
  } catch (error) {
    console.error('Error calculating macros:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
