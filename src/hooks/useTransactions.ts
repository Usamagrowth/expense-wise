import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';

export const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    // Demo Mode / LocalStorage Fallback
    if (!db || user.providerId === 'demo' || localStorage.getItem('demo_mode') === 'true') {
      try {
        const stored = localStorage.getItem(`transactions_${user.uid}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert stored string dates back to objects if needed, 
          // but our Transaction type likely expects Firestore Timestamp or similar.
          // Let's assume for demo mode we handle simple dates.
          // We might need to normalize the date format to match what the UI expects (likely .toDate() or similar if it was Timestamp).
          // However, for simplicity, let's just use the array.
          // Note: The UI likely expects { date: { seconds: ... } } or a Date object.
          // If using Firestore, we get Timestamp.
          // Let's ensure we return something compatible.
          setTransactions(parsed);
        } else {
          setTransactions([]);
        }
      } catch (e) {
        console.error("LocalStorage error:", e);
        setError('Failed to load local transactions');
      }
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: Transaction[] = [];
      snapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id } as Transaction);
      });
      setTransactions(results);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setError('Failed to fetch transactions');
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId' | 'date'>) => {
    if (!user) return;
    
    // Demo Mode / LocalStorage Fallback
    if (!db || user.providerId === 'demo' || localStorage.getItem('demo_mode') === 'true') {
      try {
        const newTransaction = {
          ...transaction,
          id: Date.now().toString(),
          userId: user.uid,
          date: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 }, // Mock Firestore Timestamp
          amount: Number(transaction.amount)
        } as unknown as Transaction;

        const current = [...transactions, newTransaction];
        // Sort by date desc
        current.sort((a, b) => {
            // @ts-ignore
            return b.date.seconds - a.date.seconds; 
        });

        localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(current));
        setTransactions(current);
        return;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to add transaction locally');
      }
    }

    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId: user.uid,
        date: Timestamp.now(),
        amount: Number(transaction.amount) // Ensure number
      });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add transaction');
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;

    // Demo Mode / LocalStorage Fallback
    if (!db || user.providerId === 'demo' || localStorage.getItem('demo_mode') === 'true') {
        try {
            const updated = transactions.filter(t => t.id !== id);
            localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(updated));
            setTransactions(updated);
            return;
        } catch (err) {
            console.error(err);
            throw new Error('Failed to delete transaction locally');
        }
    }

    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete transaction');
    }
  };

  const totals = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
      } else {
        acc.expense += curr.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    totals,
    balance
  };
};
