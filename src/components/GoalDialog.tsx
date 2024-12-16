import * as Dialog from "@radix-ui/react-dialog";
import { Target, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInvestmentStore } from "../store/useInvestmentStore";

const schema = z.object({
  amount: z.number().positive(),
  targetDate: z.string(),
});

type FormData = z.infer<typeof schema>;

export function GoalDialog() {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setGoal = useInvestmentStore((state) => state.setGoal);

  const onSubmit = (data: FormData) => {
    setGoal({
      amount: data.amount,
      targetDate: new Date(data.targetDate),
    });
    reset();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-accent text-primary hover:bg-accent/90 transition-colors">
          <Target className="w-4 h-4 mr-2" />
          Definir Meta
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-secondary p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-foreground mb-4">
            Definir Meta de Investimento
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Valor da Meta
              </label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Data Alvo
              </label>
              <input
                type="date"
                {...register("targetDate")}
                className="w-full px-3 py-2 rounded-md bg-background text-foreground border border-accent/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md bg-accent text-primary hover:bg-accent/90 transition-colors"
            >
              Salvar Meta
            </button>
          </form>

          <Dialog.Close className="absolute top-4 right-4 text-foreground/60 hover:text-foreground">
            <X className="w-4 h-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
