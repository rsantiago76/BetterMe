/**
 * POST /api/auth/register
 * 
 * Register new user account
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '../lib/db';
import { signToken } from '../lib/auth';

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { email, password, name }: RegisterRequest = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    // Check if user exists
    const existingUser = await queryOne(`
      SELECT id FROM users WHERE email = $1
    `, [email.toLowerCase()]);
    
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await queryOne(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES ($1, $2, $3, 'user')
      RETURNING id, email, name, role
    `, [email.toLowerCase(), passwordHash, name]);
    
    // Create free subscription
    await query(`
      INSERT INTO subscriptions (user_id, tier, status)
      VALUES ($1, 'free', 'active')
    `, [user.id]);
    
    // Generate JWT
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tier: 'free',
    });
    
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tier: 'free',
      },
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
