/**
 * POST /api/auth/login
 * 
 * Authenticate user and return JWT token
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { queryOne } from '../lib/db';
import { signToken } from '../lib/auth';

interface LoginRequest {
  email: string;
  password: string;
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
    const { email, password }: LoginRequest = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Find user
    const user = await queryOne(`
      SELECT u.id, u.email, u.name, u.password_hash, u.role, s.tier
      FROM users u
      LEFT JOIN subscriptions s ON s.user_id = u.id
      WHERE u.email = $1
    `, [email.toLowerCase()]);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      tier: user.tier || 'free',
    });
    
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tier: user.tier || 'free',
      },
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
