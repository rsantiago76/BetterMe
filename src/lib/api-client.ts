/**
 * Frontend API client for interacting with Vercel serverless functions
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiError {
  error: string;
  message?: string;
  requiredTier?: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Set authentication token
   */
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear authentication token
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Make authenticated request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new ApiError(
        'Invalid response',
        `Expected JSON but received ${contentType}. The API may be unavailable or returning an error page.`,
        undefined
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Request failed', data.message, data.requiredTier);
    }

    return data;
  }

  // ===== Auth Endpoints =====

  async login(email: string, password: string) {
    const data = await this.request<{
      success: boolean;
      token: string;
      user: any;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.setToken(data.token);
    return data.user;
  }

  async register(email: string, password: string, name: string) {
    const data = await this.request<{
      success: boolean;
      token: string;
      user: any;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    this.setToken(data.token);
    return data.user;
  }

  logout() {
    this.clearToken();
  }

  // ===== Macro Calculator =====

  async calculateMacros(profile: {
    age: number;
    gender: 'male' | 'female';
    weight_lbs: number;
    height_inches: number;
    activity_level: string;
    goal: string;
  }, saveProfile?: boolean, profileName?: string) {
    return this.request<{
      success: boolean;
      result: any;
      saved: boolean;
      profileId?: string;
    }>('/macros/calculate', {
      method: 'POST',
      body: JSON.stringify({ profile, saveProfile, profileName }),
    });
  }

  // ===== Weekly Plans =====

  async listWeeklyPlans() {
    return this.request<{
      success: boolean;
      plans: any[];
    }>('/plans/weekly');
  }

  async getWeeklyPlan(id: string) {
    return this.request<{
      success: boolean;
      plan: any;
    }>(`/plans/weekly?id=${id}`);
  }

  async createWeeklyPlan(data: {
    name: string;
    trainingSchedule: string;
    trainingDays: string[];
  }) {
    return this.request<{
      success: boolean;
      planId: string;
      plan: any;
    }>('/plans/weekly', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWeeklyPlan(id: string, data: {
    name?: string;
    trainingDays?: string[];
  }) {
    return this.request<{
      success: boolean;
      plan: any;
    }>(`/plans/weekly?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteWeeklyPlan(id: string) {
    return this.request<{
      success: boolean;
    }>(`/plans/weekly?id=${id}`, {
      method: 'DELETE',
    });
  }

  // ===== Stripe =====

  async createCheckoutSession(priceId: string, successUrl?: string, cancelUrl?: string) {
    return this.request<{
      success: boolean;
      sessionId: string;
      url: string;
    }>('/stripe/create-checkout', {
      method: 'POST',
      body: JSON.stringify({
        priceId,
        successUrl: successUrl || `${window.location.origin}/dashboard?success=true`,
        cancelUrl: cancelUrl || `${window.location.origin}/pricing?canceled=true`,
      }),
    });
  }
}

class ApiError extends Error {
  public requiredTier?: string;

  constructor(error: string, message?: string, requiredTier?: string) {
    super(message || error);
    this.name = 'ApiError';
    this.requiredTier = requiredTier;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export { ApiError };