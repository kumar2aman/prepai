"use client";

import { createContext, useContext } from "react";

export interface DashboardData {
  Progress: string;
  score: number;
  level: number;
  accuracy: number;
  streak: number;
  totalSession: number;
}

const DashboardContext = createContext<DashboardData | null>(null);

export default function DashboardProvider({ data, children }: any) {
  return (
    <DashboardContext.Provider value={data}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside provider");
  return ctx;
};
