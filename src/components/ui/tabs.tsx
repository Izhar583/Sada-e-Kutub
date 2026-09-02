"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: React.FC<{
  defaultValue: string;
  value?: string;
  onValueChange?: (val: string) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ defaultValue, value, onValueChange, className, children }) => {
  const [activeTabState, setActiveTabState] = useState(defaultValue);
  const activeTab = value !== undefined ? value : activeTabState;

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl bg-stone-900/90 border border-stone-800 p-1 text-stone-400 gap-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<{
  value: string;
  className?: string;
  children: React.ReactNode;
}> = ({ value, className, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer",
        isActive
          ? "bg-amber-500/15 text-amber-300 shadow-sm border border-amber-500/30 font-semibold"
          : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{
  value: string;
  className?: string;
  children: React.ReactNode;
}> = ({ value, className, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return <div className={cn("mt-4 focus-visible:outline-none", className)}>{children}</div>;
};
