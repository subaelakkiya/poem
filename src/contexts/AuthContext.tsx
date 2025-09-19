import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userData: User;
        if (userDoc.exists()) {
          userData = userDoc.data() as User;
        } else {
          // Create new user document
          userData = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Anonymous User',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || undefined,
            joinedDate: new Date().toISOString()
          };
          await setDoc(userDocRef, userData);
        }
        
        setAuthState({
          isAuthenticated: true,
          user: userData,
          loading: false
        });
      } else {
        // User is signed out
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};