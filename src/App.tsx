import { useEffect } from "react";
import { useInvestmentStore } from "./store/useInvestmentStore";
import { InvestmentForm } from "./components/InvestmentForm";
import { InvestmentList } from "./components/InvestmentList";
import { InvestmentChart } from "./components/InvestmentChart";
import { FinancialSummary } from "./components/FinancialSummary";
import { GoalProgress } from "./components/GoalProgress";
import { GoalDialog } from "./components/GoalDialog";
import { motion } from "framer-motion";

function App() {
  const fetchInvestments = useInvestmentStore(
    (state) => state.fetchInvestments
  );

  // Carregar investimentos do backend ao montar o componente
  useEffect(() => {
    fetchInvestments().catch((err) =>
      console.error("Erro ao carregar investimentos:", err)
    );
  }, [fetchInvestments]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="bg-secondary shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-heading">
              Controle de Investimentos
            </h1>
            <GoalDialog />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <FinancialSummary />
            </div>
            <div className="md:col-span-1">
              <GoalProgress />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <InvestmentForm />
            </div>
            <div className="lg:col-span-2">
              <InvestmentChart />
            </div>
          </div>

          <InvestmentList />
        </motion.div>
      </main>
    </div>
  );
}

export default App;
