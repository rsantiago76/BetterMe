/**
 * /api/plans/weekly
 * 
 * CRUD endpoints for weekly meal prep plans
 * 
 * GET    /api/plans/weekly       - List user's plans
 * POST   /api/plans/weekly       - Create new plan
 * GET    /api/plans/weekly/:id   - Get specific plan
 * PUT    /api/plans/weekly/:id   - Update plan
 * DELETE /api/plans/weekly/:id   - Delete plan
 */

import { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuth, requireTier } from '../lib/auth';
import { query, queryOne } from '../lib/db';
import { 
  generateWeeklyPlan, 
  generateShoppingList,
  type DayOfWeek,
  type WeeklyPlan,
} from '../../src/utils/meal-prep-planner';

interface CreatePlanRequest {
  name: string;
  trainingSchedule: string;
  trainingDays: DayOfWeek[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // LIST plans
    if (req.method === 'GET' && !req.query.id) {
      const user = await requireAuth(req, res);
      if (!user) return;
      
      const plans = await query(`
        SELECT 
          id, name, training_schedule, training_days, 
          total_shakes, created_at, updated_at
        FROM weekly_plans
        WHERE user_id = $1
        ORDER BY created_at DESC
      `, [user.userId]);
      
      return res.status(200).json({
        success: true,
        plans,
      });
    }
    
    // GET specific plan
    if (req.method === 'GET' && req.query.id) {
      const user = await requireAuth(req, res);
      if (!user) return;
      
      const plan = await queryOne(`
        SELECT *
        FROM weekly_plans
        WHERE id = $1 AND user_id = $2
      `, [req.query.id, user.userId]);
      
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      
      return res.status(200).json({
        success: true,
        plan,
      });
    }
    
    // CREATE plan
    if (req.method === 'POST') {
      // Check tier - Free users can only create 1 plan
      const user = await requireAuth(req, res);
      if (!user) return;
      
      if (user.tier === 'free') {
        // Check existing plan count
        const existingPlans = await query(`
          SELECT COUNT(*) as count
          FROM weekly_plans
          WHERE user_id = $1
        `, [user.userId]);
        
        const planCount = parseInt(existingPlans[0].count);
        
        if (planCount >= 1) {
          return res.status(403).json({
            error: 'Forbidden',
            message: "You've reached your limit of 1 weekly plan. Upgrade to Pro for unlimited plans.",
            requiredTier: 'pro',
          });
        }
      }
      
      const { name, trainingSchedule, trainingDays }: CreatePlanRequest = req.body;
      
      if (!name || !trainingSchedule || !trainingDays) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Generate the plan
      const weeklyPlan: WeeklyPlan = generateWeeklyPlan(trainingDays);
      const shoppingList = generateShoppingList(weeklyPlan);
      
      // Save to database
      const savedPlan = await queryOne(`
        INSERT INTO weekly_plans (
          user_id, name, training_schedule, training_days,
          plan_data, shopping_list, total_shakes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, created_at
      `, [
        user.userId,
        name,
        trainingSchedule,
        trainingDays,
        JSON.stringify(weeklyPlan),
        JSON.stringify(shoppingList),
        weeklyPlan.totalShakes,
      ]);
      
      return res.status(201).json({
        success: true,
        message: 'Weekly plan created successfully',
        planId: savedPlan.id,
        plan: {
          id: savedPlan.id,
          name,
          trainingSchedule,
          trainingDays,
          totalShakes: weeklyPlan.totalShakes,
          createdAt: savedPlan.created_at,
        },
      });
    }
    
    // UPDATE plan
    if (req.method === 'PUT') {
      const user = await requireAuth(req, res);
      if (!user) return;
      
      const planId = req.query.id;
      const { name, trainingDays }: Partial<CreatePlanRequest> = req.body;
      
      if (!planId) {
        return res.status(400).json({ error: 'Plan ID required' });
      }
      
      // Verify ownership
      const existingPlan = await queryOne(`
        SELECT id FROM weekly_plans
        WHERE id = $1 AND user_id = $2
      `, [planId, user.userId]);
      
      if (!existingPlan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      
      // Regenerate plan if training days changed
      let updateQuery = 'UPDATE weekly_plans SET ';
      const updateParams: any[] = [];
      let paramCount = 1;
      
      if (name) {
        updateQuery += `name = $${paramCount}, `;
        updateParams.push(name);
        paramCount++;
      }
      
      if (trainingDays) {
        const weeklyPlan = generateWeeklyPlan(trainingDays);
        const shoppingList = generateShoppingList(weeklyPlan);
        
        updateQuery += `training_days = $${paramCount}, `;
        updateParams.push(trainingDays);
        paramCount++;
        
        updateQuery += `plan_data = $${paramCount}, `;
        updateParams.push(JSON.stringify(weeklyPlan));
        paramCount++;
        
        updateQuery += `shopping_list = $${paramCount}, `;
        updateParams.push(JSON.stringify(shoppingList));
        paramCount++;
        
        updateQuery += `total_shakes = $${paramCount}, `;
        updateParams.push(weeklyPlan.totalShakes);
        paramCount++;
      }
      
      updateQuery += `updated_at = NOW() WHERE id = $${paramCount} RETURNING *`;
      updateParams.push(planId);
      
      const updatedPlan = await queryOne(updateQuery, updateParams);
      
      return res.status(200).json({
        success: true,
        message: 'Plan updated successfully',
        plan: updatedPlan,
      });
    }
    
    // DELETE plan
    if (req.method === 'DELETE') {
      const user = await requireAuth(req, res);
      if (!user) return;
      
      const planId = req.query.id;
      
      if (!planId) {
        return res.status(400).json({ error: 'Plan ID required' });
      }
      
      const result = await query(`
        DELETE FROM weekly_plans
        WHERE id = $1 AND user_id = $2
        RETURNING id
      `, [planId, user.userId]);
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Plan deleted successfully',
      });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Error handling weekly plans:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
