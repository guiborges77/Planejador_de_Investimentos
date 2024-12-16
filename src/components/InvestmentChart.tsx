import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useInvestmentStore } from '../store/useInvestmentStore';
import { addMonths, format } from 'date-fns';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function InvestmentChart() {
  const investments = useInvestmentStore((state) =>
    state.investments.map((inv) => ({
      ...inv,
      date: new Date(inv.date),
    }))
  );

  if (investments.length === 0) {
    return <p className="text-gray-300">Nenhum investimento encontrado.</p>;
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const generateChartData = () => {
    const startDate = new Date(Math.min(...investments.map((inv) => inv.date.getTime())));
    const endDate = addMonths(new Date(), 12);
    const monthlyData = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const totalInvested = investments
        .filter((inv) => inv.date <= currentDate)
        .reduce((sum, inv) => sum + inv.amount, 0);

      const monthsElapsed = investments.map((inv) => {
        const months = (currentDate.getTime() - inv.date.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
        return {
          amount: inv.amount,
          months: Math.max(0, months),
        };
      });

      const totalWithInterest = monthsElapsed.reduce((sum, { amount, months }) => {
        const yearlyRate = 0.1;
        const monthlyRate = yearlyRate / 12;
        return sum + amount * Math.pow(1 + monthlyRate, months);
      }, 0);

      monthlyData.push({
        date: format(currentDate, 'MMM yyyy'),
        invested: totalInvested,
        total: totalWithInterest,
      });

      currentDate = addMonths(currentDate, 1);
    }

    return monthlyData;
  };

  const chartData = generateChartData();

  const data = {
    labels: chartData.map((d) => d.date),
    datasets: [
      {
        label: 'Total Investido',
        data: chartData.map((d) => d.invested),
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgba(148, 163, 184, 0.5)',
      },
      {
        label: 'Total com Juros',
        data: chartData.map((d) => d.total),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(241, 245, 249)',
        },
      },
      title: {
        display: true,
        text: 'Crescimento do Investimento com Juros Compostos',
        color: 'rgb(241, 245, 249)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(241, 245, 249)',
          callback: (value: number) => formatCurrency(value),
        },
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(241, 245, 249)',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary p-6 rounded-lg shadow-lg"
    >
      <Line data={data} options={options} />
    </motion.div>
  );
}
