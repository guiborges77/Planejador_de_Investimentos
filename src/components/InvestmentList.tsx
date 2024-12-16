import { useState } from "react";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { useInvestmentStore } from "../store/useInvestmentStore";
import { InvestmentType } from "../types/investment";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils/format";

const investmentTypeLabels: Record<InvestmentType, string> = {
  FIXED_INCOME: "Renda Fixa",
  STOCKS: "Ações",
  ETFS: "ETFs",
};

export function InvestmentList() {
  const [typeFilter, setTypeFilter] = useState<InvestmentType | "ALL">("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { investments, deleteInvestment } = useInvestmentStore();

  const filteredInvestments = investments.filter((investment) => {
    const matchesType = typeFilter === "ALL" || investment.type === typeFilter;
    const matchesDateRange =
      (!startDate || new Date(investment.date) >= new Date(startDate)) &&
      (!endDate || new Date(investment.date) <= new Date(endDate));
    return matchesType && matchesDateRange;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary rounded-lg shadow-lg overflow-hidden font-sans"
    >
      <div className="p-4 border-b border-accent/10">
        <h2 className="text-xl font-semibold text-foreground font-heading">
          Histórico de Investimentos
        </h2>

        <div className="mt-4 flex gap-4 flex-wrap">
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as InvestmentType | "ALL")
            }
            className="px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
          >
            <option value="ALL">Todos os Tipos</option>
            <option value="FIXED_INCOME">Renda Fixa</option>
            <option value="STOCKS">Ações</option>
            <option value="ETFS">ETFs</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-accent/10">
          <thead className="bg-background/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider font-heading">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider font-heading">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider font-heading">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider font-heading">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent/10">
            {filteredInvestments.map((investment, index) => (
              <motion.tr
                key={investment.id || `investment-${index}`} // Garantir uma key única mesmo se o id não existir
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-background/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-foreground">
                  {format(new Date(investment.date), "dd/MM/yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground">
                  {formatCurrency(investment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground">
                  {investmentTypeLabels[investment.type]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        /* TODO: Implement edit */
                      }}
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Deseja realmente excluir este investimento?"
                          )
                        ) {
                          deleteInvestment(investment.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}