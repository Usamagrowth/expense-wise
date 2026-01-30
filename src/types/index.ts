export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: any; // Timestamp or Date
  type: 'income' | 'expense';
  userId: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
