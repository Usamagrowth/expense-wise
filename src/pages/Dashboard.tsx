import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, Trash2, Wallet } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionForm, { TransactionFormData } from '../components/TransactionForm';
import PaystackDeposit from '../components/PaystackDeposit';
import DashboardCharts from '../components/DashboardCharts';
import { format } from 'date-fns';
import { Transaction } from '../types';

const Dashboard = () => {
  const { transactions, loading, addTransaction, deleteTransaction, totals, balance } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  const handleAddTransaction = async (data: TransactionFormData) => {
    try {
      await addTransaction(data);
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const handleDeposit = async (data: Omit<Transaction, 'id' | 'userId' | 'date'>) => {
    try {
      await addTransaction(data);
    } catch (error) {
      console.error("Failed to add deposit", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsDepositOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Wallet size={20} />
            <span className="hidden sm:inline">Deposit</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400 text-sm font-medium">Current Balance</h3>
          <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 opacity-10">
             <ArrowUpRight size={48} className="text-emerald-500" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Income</h3>
          <p className="text-3xl font-bold text-emerald-400 mt-2">${totals.income.toFixed(2)}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
           <div className="absolute right-0 top-0 p-4 opacity-10">
             <ArrowDownRight size={48} className="text-red-500" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-400 mt-2">${totals.expense.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 h-96">
          <h3 className="text-lg font-semibold text-white mb-4">Spending Analysis</h3>
          <div className="h-[300px]">
            <DashboardCharts transactions={transactions} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-96 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {transactions.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {transaction.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-xs text-slate-400">{transaction.category} • {transaction.date ? format(transaction.date.toDate(), 'MMM d, yyyy') : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${
                      transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => handleDelete(transaction.id)}
                      className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TransactionForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddTransaction}
        />
      )}

      {isDepositOpen && (
        <PaystackDeposit 
          onClose={() => setIsDepositOpen(false)} 
          onDeposit={handleDeposit}
        />
      )}
    </div>
  );
};

export default Dashboard;
