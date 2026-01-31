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
          // Hydrate the date objects to have a .toDate() method
          const hydrated = parsed.map((t: any) => ({
            ...t,
            date: {
              seconds: t.date?.seconds || Math.floor(Date.now() / 1000),
              nanoseconds: t.date?.nanoseconds || 0,
              toDate: () => new Date((t.date?.seconds || Math.floor(Date.now() / 1000)) * 1000)
            }
          }));
          setTransactions(hydrated);
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
        const now = Math.floor(Date.now() / 1000);
        const newTransaction = {
          ...transaction,
          id: Date.now().toString(),
          userId: user.uid,
          date: { 
            seconds: now, 
            nanoseconds: 0,
            toDate: () => new Date(now * 1000) 
          }, 
          amount: Number(transaction.amount)
        } as unknown as Transaction;

        // READ FRESH FROM STORAGE TO AVOID STALE STATE
        const stored = localStorage.getItem(`transactions_${user.uid}`);
        const currentTransactions = stored ? JSON.parse(stored) : [];
        
        const updated = [newTransaction, ...currentTransactions];
        
        localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(updated));
        
        // Re-hydrate everything to ensure consistency
        const hydrated = updated.map((t: any) => ({
            ...t,
            date: {
              seconds: t.date?.seconds || Math.floor(Date.now() / 1000),
              nanoseconds: t.date?.nanoseconds || 0,
              toDate: () => new Date((t.date?.seconds || Math.floor(Date.now() / 1000)) * 1000)
            }
        }));
        
        setTransactions(hydrated);
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
            console.log("Deleting transaction:", id);
            
            // READ FRESH FROM STORAGE TO AVOID STALE STATE
            const stored = localStorage.getItem(`transactions_${user.uid}`);
            if (!stored) return;

            const currentTransactions = JSON.parse(stored);
            const updated = currentTransactions.filter((t: any) => t.id !== id);
            
            localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(updated));
            
            // Hydrate for state
            const hydrated = updated.map((t: any) => ({
                ...t,
                date: {
                  seconds: t.date?.seconds || Math.floor(Date.now() / 1000),
                  nanoseconds: t.date?.nanoseconds || 0,
                  toDate: () => new Date((t.date?.seconds || Math.floor(Date.now() / 1000)) * 1000)
                }
            }));
            
            setTransactions(hydrated);
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
