/**
 * Authentication utilities for Vercel serverless functions
 * Uses JWT for session management
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long'
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  tier: string;
}

/**
 * Sign a JWT token
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  const token = await new jose.SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  
  return token;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Extract JWT from request headers
 */
export function getTokenFromRequest(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return null;
  }
  
  // Bearer token format: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Authenticate request and return user info
 */
export async function authenticateRequest(
  req: VercelRequest
): Promise<JWTPayload | null> {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(
  req: VercelRequest,
  res: VercelResponse
): Promise<JWTPayload | null> {
  const user = await authenticateRequest(req);
  
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  
  return user;
}

/**
 * Middleware to require specific tier
 */
export async function requireTier(
  req: VercelRequest,
  res: VercelResponse,
  requiredTier: 'pro' | 'team'
): Promise<JWTPayload | null> {
  const user = await requireAuth(req, res);
  
  if (!user) {
    return null;
  }
  
  const tierLevels: Record<string, number> = {
    free: 0,
    pro: 1,
    team: 2,
  };
  
  if (tierLevels[user.tier] < tierLevels[requiredTier]) {
    res.status(403).json({ 
      error: 'Forbidden',
      message: `This feature requires ${requiredTier} tier`,
      requiredTier,
    });
    return null;
  }
  
  return user;
}

/**
 * Middleware to require specific role
 */
export async function requireRole(
  req: VercelRequest,
  res: VercelResponse,
  requiredRole: 'coach' | 'admin'
): Promise<JWTPayload | null> {
  const user = await requireAuth(req, res);
  
  if (!user) {
    return null;
  }
  
  if (user.role !== requiredRole && user.role !== 'admin') {
    res.status(403).json({ 
      error: 'Forbidden',
      message: `This endpoint requires ${requiredRole} role`,
    });
    return null;
  }
  
  return user;
}
