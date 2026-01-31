import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginDemo: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  loginDemo: () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginDemo = () => {
    const demoUser = {
      uid: 'demo-user-123',
      email: 'demo@example.com',
      displayName: 'Demo User',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => '',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      photoURL: null,
      providerId: 'demo'
    } as unknown as User;
    
    setUser(demoUser);
    localStorage.setItem('demo_mode', 'true');
  };

  const logout = async () => {
    if (auth) {
      await auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('demo_mode');
  };

  useEffect(() => {
    // Check for demo mode
    if (localStorage.getItem('demo_mode') === 'true') {
      loginDemo();
      setLoading(false);
      return;
    }

    // Check if Firebase is properly configured
    if (!auth) {
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(
        auth, 
        (user) => {
          if (user) {
            setUser(user);
            localStorage.removeItem('demo_mode'); // Clear demo mode if real auth works
          } else {
             // Only clear user if we are not in demo mode (handled by the early return above/logic flow)
             // But wait, onAuthStateChanged fires with null on logout.
             // If we are in demo mode, onAuthStateChanged shouldn't be firing or we shouldn't care?
             // Actually, if auth exists, we might still want demo mode fallback?
             // No, if auth exists, we prefer real auth.
             setUser(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Firebase Auth Error:", error);
          setLoading(false);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.error("Firebase Auth Initialization Error:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginDemo, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
