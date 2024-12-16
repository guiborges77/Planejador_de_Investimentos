import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import { InvestmentType } from "../types/investment";
import { useInvestmentStore } from "../store/useInvestmentStore";
import { motion } from "framer-motion";

const schema = z.object({
  amount: z.number().positive(),
  date: z.string(),
  type: z.enum(["FIXED_INCOME", "STOCKS", "ETFS"]),
  nome: z.string().optional(), // Campo opcional
});

type FormData = z.infer<typeof schema>;

export function InvestmentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const addInvestment = useInvestmentStore((state) => state.addInvestment);

  const onSubmit = (data: FormData) => {
    addInvestment({
      amount: data.amount,
      date: new Date(data.date),
      type: data.type as InvestmentType,
      nome: data.nome || undefined,
    });
    reset();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-secondary p-6 rounded-lg shadow-lg font-sans"
    >
      <h2 className="text-xl font-semibold text-foreground mb-4 font-heading">
        Novo Investimento
      </h2>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1 font-heading">
          Nome (opcional)
        </label>
        <input
          type="text"
          {...register("nome")}
          className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1 font-heading">
          Valor
        </label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
          className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
        />
        {errors.amount && (
          <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1 font-heading">
          Data
        </label>
        <input
          type="date"
          {...register("date")}
          className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
        />
        {errors.date && (
          <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1 font-heading">
          Tipo
        </label>
        <select
          {...register("type")}
          className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
        >
          <option value="FIXED_INCOME">Renda Fixa</option>
          <option value="STOCKS">Ações</option>
          <option value="ETFS">ETFs</option>
        </select>
        {errors.type && (
          <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-accent text-primary hover:bg-accent/90 focus:ring-2 focus:ring-accent/50 outline-none transition-all font-sans"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Adicionar Investimento
      </button>
    </motion.form>
  );
}
