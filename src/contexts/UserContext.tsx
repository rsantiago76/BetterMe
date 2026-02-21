import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SubscriptionTier, UserRole, UserSubscription } from '../utils/subscription-tiers';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: UserSubscription;
  createdAt: Date;
  stats?: {
    weeklyPlansCreated: number;
    savedProfiles: number;
    clients: number;
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  tier: SubscriptionTier;
  canAccess: (feature: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Mock user - in production this would come from auth/backend
  const [user, setUser] = useState<User | null>({
    id: 'user_123',
    email: 'demo@betterme.com',
    name: 'Demo User',
    role: 'user',
    subscription: {
      tier: 'free', // Change to 'pro' or 'team' to test different tiers
      status: 'active',
    },
    createdAt: new Date('2024-01-01'),
    stats: {
      weeklyPlansCreated: 1,
      savedProfiles: 0,
      clients: 0,
    },
  });

  const tier = user?.subscription.tier || 'free';
  const isAuthenticated = user !== null;

  const canAccess = (feature: string): boolean => {
    // Basic feature access check
    return true; // Implement actual logic based on subscription-tiers.ts
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        tier,
        canAccess,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
