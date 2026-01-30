import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types';

interface DashboardChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

const DashboardCharts: React.FC<DashboardChartsProps> = ({ transactions }) => {
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value);

  if (expenseData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        No expense data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={expenseData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F1F5F9' }}
          itemStyle={{ color: '#F1F5F9' }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardCharts;
