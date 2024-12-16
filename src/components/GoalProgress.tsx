import React from 'react';
import { Target } from 'lucide-react';
import { Progress } from './ui/progress';
import { useInvestmentStore } from '../store/useInvestmentStore';
import { formatCurrency } from '../utils/format';
import { motion } from 'framer-motion';

export function GoalProgress() {
  const summary = useInvestmentStore((state) => state.getSummary());
  const progress = Math.min((summary.currentBalance / summary.goal) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-accent/20 rounded-lg">
          <Target className="w-6 h-6 text-accent" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-foreground">Meta de Investimento</h3>
          <p className="text-2xl font-semibold text-primary">
            {formatCurrency(summary.goal)}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Progress value={progress} />
        <p className="text-sm text-foreground/80">
          {formatCurrency(summary.currentBalance)} de {formatCurrency(summary.goal)} ({progress.toFixed(1)}%)
        </p>
      </div>
    </motion.div>
  );
}