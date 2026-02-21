import React, { useState } from 'react';
import { cn } from './ui/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface BetterTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function BetterTabs({ tabs, defaultTab, className }: BetterTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-2 border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 font-semibold transition-all duration-200 border-b-2 -mb-px',
              activeTab === tab.id
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'transition-opacity duration-200',
              activeTab === tab.id ? 'block' : 'hidden'
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
