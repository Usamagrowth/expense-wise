import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../hooks/useTransactions';
import { format } from 'date-fns';

const Analytics = () => {
  const { transactions } = useTransactions();

  // Group transactions by date for the chart
  const data = transactions.reduce((acc, curr) => {
    const date = curr.date ? format(curr.date.toDate(), 'MMM dd') : 'N/A';
    const existing = acc.find(item => item.date === date);
    if (existing) {
      if (curr.type === 'income') existing.income += curr.amount;
      else existing.expense += curr.amount;
    } else {
      acc.push({
        date,
        income: curr.type === 'income' ? curr.amount : 0,
        expense: curr.type === 'expense' ? curr.amount : 0,
      });
    }
    return acc;
  }, [] as any[]).reverse(); // Show oldest to newest

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Analytics</h1>
      
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-96">
        <h3 className="text-lg font-semibold text-white mb-4">Income vs Expense Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="date" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F1F5F9' }}
              cursor={{ fill: '#1E293B' }}
            />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expense" fill="#EF4444" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
