import React from 'react';
import { Link, useLocation } from 'react-router';
import { Logo } from './logo';
import { BetterButton } from './better-button';
import { useAuth } from '../../contexts/auth-context';

export function MainNavigation() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/techniques', label: 'Training' },
    { path: '/nutrition', label: 'Nutrition' },
    { path: '/supplements', label: 'Supplements' },
    { path: '/recipes', label: 'Recipes' },
    { path: '/pricing', label: 'Subscriptions' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline">
                  Hi, {user?.name}
                </span>
                <Link to="/dashboard">
                  <BetterButton variant="primary" size="sm">
                    Dashboard
                  </BetterButton>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <BetterButton variant="outline" size="sm">
                    Sign In
                  </BetterButton>
                </Link>
                <Link to="/register">
                  <BetterButton variant="primary" size="sm" className="hidden md:inline-flex">
                    Get Started
                  </BetterButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}