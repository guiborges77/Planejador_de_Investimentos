import { Investment } from '../types/investment';
import { differenceInYears } from 'date-fns';

const ANNUAL_INTEREST_RATE = 0.10; // 10% annual interest rate

export function calculateCompoundInterest(investments: Investment[]): number {
  const currentDate = new Date();
  
  return investments.reduce((totalInterest, investment) => {
    const years = differenceInYears(currentDate, investment.date);
    const futureValue = investment.amount * Math.pow(1 + ANNUAL_INTEREST_RATE, years);
    return totalInterest + (futureValue - investment.amount);
  }, 0);
}