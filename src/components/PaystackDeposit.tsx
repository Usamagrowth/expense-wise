import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { CreditCard, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

interface PaystackDepositProps {
  onClose: () => void;
  onDeposit: (transaction: Omit<Transaction, 'id' | 'userId' | 'date'>) => Promise<void>;
}

const PaystackDeposit: React.FC<PaystackDepositProps> = ({ onClose, onDeposit }) => {
  const [amount, setAmount] = useState<string>('');
  const { user } = useAuth();

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email || '',
    amount: Number(amount) * 100, // Paystack expects amount in kobo
    publicKey: PAYSTACK_PUBLIC_KEY,
  };

  const onSuccess = async (reference: any) => {
    // Add transaction as income
    await onDeposit({
      amount: Number(amount),
      category: 'Income',
      description: 'Deposit via Paystack',
      type: 'income'
    });
    alert('Deposit successful! Transaction added.');
    onClose();
  };

  const onClosePaystack = () => {
    console.log('Payment closed');
  };

  const initializePayment = usePaystackPayment(config);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    initializePayment({onSuccess, onClose: onClosePaystack});
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 rounded-xl border border-slate-800 w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="text-blue-500" />
            Deposit Funds
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Amount (NGN)</label>
            <input
              type="number"
              min="100"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-xs text-slate-500 mt-1">Minimum deposit: 100</p>
          </div>

          <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 text-sm text-blue-200">
            <p>You are about to deposit <strong>NGN {amount || '0'}</strong> via Paystack.</p>
            <p className="mt-1 text-xs text-blue-400">Note: This is a test integration. Use test cards.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaystackDeposit;
