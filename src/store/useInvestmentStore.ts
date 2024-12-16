import { create } from "zustand";
import {
  Investment,
  InvestmentSummary,
  InvestmentGoal,
} from "../types/investment";
import { calculateCompoundInterest } from "../utils/financial";

interface InvestmentStore {
  investments: Investment[];
  goal: InvestmentGoal | null;
  fetchInvestments: () => Promise<void>;
  addInvestment: (investment: Omit<Investment, "id">) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
  setGoal: (goal: InvestmentGoal) => void;
  getSummary: () => InvestmentSummary;
}

const API_URL = "http://localhost:5000/api/investments";

export const useInvestmentStore = create<InvestmentStore>((set, get) => ({
  investments: [],
  goal: null,

  // Buscar investimentos do backend
  fetchInvestments: async () => {
    const response = await fetch(API_URL);
    const investments = await response.json();
    set({ investments });
  },

  // Adicionar investimento no backend
  addInvestment: async (investment) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(investment),
    });
    const newInvestment = await response.json();
    set((state) => ({ investments: [...state.investments, newInvestment] }));
  },

  // Remover investimento do backend
  deleteInvestment: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    set((state) => ({
      investments: state.investments.filter((inv) => inv.id !== id),
    }));
  },

  setGoal: (goal) => {
    set({ goal });
  },

  getSummary: () => {
    const { investments, goal } = get();
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalInterest = calculateCompoundInterest(investments);
    return {
      totalInvested,
      totalInterest,
      currentBalance: totalInvested + totalInterest,
      goal: goal?.amount ?? 0,
    };
  },
}));
