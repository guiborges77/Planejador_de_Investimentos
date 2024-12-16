export type InvestmentType = "FIXED_INCOME" | "STOCKS" | "ETFS";

export interface Investment {
  id: string;
  amount: number;
  date: Date;
  type: InvestmentType;
  nome?: string;
}

export interface InvestmentSummary {
  totalInvested: number;
  totalInterest: number;
  currentBalance: number;
  goal: number;
}

export interface InvestmentGoal {
  amount: number;
  targetDate: Date;
}
