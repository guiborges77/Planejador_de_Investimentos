import React from "react";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { useInvestmentStore } from "../store/useInvestmentStore";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils/format";

export function FinancialSummary() {
  const summary = useInvestmentStore((state) => state.getSummary());

  const cards = [
    {
      title: "Total Investido",
      value: summary.totalInvested,
      icon: DollarSign,
      color: "bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Total em Juros",
      value: summary.totalInterest,
      icon: TrendingUp,
      color: "bg-green-500/20",
      iconColor: "text-green-500",
    },
    {
      title: "Saldo Atual",
      value: summary.currentBalance,
      icon: Wallet,
      color: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-xl transition-all font-sans"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${card.color}`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-foreground/60 font-heading">
                {card.title}
              </p>
              <p className="text-2xl font-semibold text-foreground font-sans">
                {formatCurrency(card.value)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
