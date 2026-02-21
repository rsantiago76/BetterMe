import React from 'react';
import { Link } from 'react-router';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tight text-foreground">
          Better<span className="text-primary">Me</span>
        </span>
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Performance Nutrition
        </span>
      </div>
    </Link>
  );
}