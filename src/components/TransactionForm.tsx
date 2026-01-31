import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
}

export interface TransactionFormData {
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

const CATEGORIES = [
  'Food & Drink',
  'Shopping',
  'Housing',
  'Transportation',
  'Vehicle',
  'Life & Entertainment',
  'Communication & PC',
  'Financial expenses',
  'Investments',
  'Income',
  'Others'
];

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TransactionFormData>({
    defaultValues: {
      type: 'expense',
      amount: 0,
      category: '',
      description: ''
    }
  });

  const onFormSubmit = async (data: TransactionFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 rounded-xl border border-slate-800 w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="expense"
                  className="peer sr-only"
                  {...register('type')}
                />
                <div className="text-center py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 peer-checked:bg-red-500/20 peer-checked:border-red-500 peer-checked:text-red-500 transition-all">
                  Expense
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="income"
                  className="peer sr-only"
                  {...register('type')}
                />
                <div className="text-center py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500 peer-checked:text-emerald-500 transition-all">
                  Income
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              {...register('amount', { required: true, min: 0 })}
            />
            {errors.amount && <span className="text-red-500 text-xs">Amount is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('category', { required: true })}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="text-red-500 text-xs">Category is required</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What is this for?"
              {...register('description', { required: true })}
            />
            {errors.description && <span className="text-red-500 text-xs">Description is required</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
