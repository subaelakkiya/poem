@@ .. @@
 import React, { createContext, useContext, useState, useEffect } from 'react';
+import { 
+  signInWithPopup, 
+  signOut, 
+  onAuthStateChanged,
+  User as FirebaseUser
+} from 'firebase/auth';
+import { doc, setDoc, getDoc } from 'firebase/firestore';
+import { auth, googleProvider, db } from '../config/firebase';
 import { AuthState, User } from '../types';

 interface AuthContextType extends AuthState {
-  login: (email: string, password: string) => Promise<boolean>;
+  loginWithGoogle: () => Promise<boolean>;
   logout: () => void;
-  register: (name: string, email: string, password: string) => Promise<boolean>;
 }

@@ .. @@
 export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [authState, setAuthState] = useState<AuthState>({
     isAuthenticated: false,
     user: null,
     loading: true
   });

   useEffect(() => {
-    // Check for stored auth data
-    const storedUser = localStorage.getItem('user');
-    if (storedUser) {
-      setAuthState({
-        isAuthenticated: true,
-        user: JSON.parse(storedUser),
-        loading: false
-      });
-    } else {
-      setAuthState(prev => ({ ...prev, loading: false }));
-    }
+    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
+      if (firebaseUser) {
+        // User is signed in
+        const userDocRef = doc(db, 'users', firebaseUser.uid);
+        const userDoc = await getDoc(userDocRef);
+        
+        let userData: User;
+        if (userDoc.exists()) {
+          userData = userDoc.data() as User;
+        } else {
+          // Create new user document
+          userData = {
+            id: firebaseUser.uid,
+            name: firebaseUser.displayName || 'Anonymous User',
+            email: firebaseUser.email || '',
+            avatar: firebaseUser.photoURL || undefined,
+            joinedDate: new Date().toISOString()
+          };
+          await setDoc(userDocRef, userData);
+        }
+        
+        setAuthState({
+          isAuthenticated: true,
+          user: userData,
+          loading: false
+        });
+      } else {
+        // User is signed out
+        setAuthState({
+          isAuthenticated: false,
+          user: null,
+          loading: false
+        });
+      }
+    });
+
+    return () => unsubscribe();
   }, []);

-  const login = async (email: string, password: string): Promise<boolean> => {
+  const loginWithGoogle = async (): Promise<boolean> => {
     try {
-      // Simulate API call
-      await new Promise(resolve => setTimeout(resolve, 1000));
-      
-      // Mock user data
-      const user: User = {
-        id: '1',
-        name: 'கவிதை வாசகர்',
-        email,
-        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
-        joinedDate: new Date().toISOString()
-      };
-
-      localStorage.setItem('user', JSON.stringify(user));
-      setAuthState({
-        isAuthenticated: true,
-        user,
-        loading: false
-      });
+      await signInWithPopup(auth, googleProvider);
       return true;
     } catch (error) {
+      console.error('Error signing in with Google:', error);
       return false;
     }
   };

-  const register = async (name: string, email: string, password: string): Promise<boolean> => {
+  const logout = async () => {
     try {
-      // Simulate API call
-      await new Promise(resolve => setTimeout(resolve, 1000));
-      
-      const user: User = {
-        id: Date.now().toString(),
-        name,
-        email,
-        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
-        joinedDate: new Date().toISOString()
-      };
-
-      localStorage.setItem('user', JSON.stringify(user));
-      setAuthState({
-        isAuthenticated: true,
-        user,
-        loading: false
-      });
-      return true;
+      await signOut(auth);
     } catch (error) {
-      return false;
+      console.error('Error signing out:', error);
     }
   };

-  const logout = () => {
-    localStorage.removeItem('user');
-    setAuthState({
-      isAuthenticated: false,
-      user: null,
-      loading: false
-    });
-  };
-
   return (
     <AuthContext.Provider value={{
       ...authState,
-      login,
-      logout,
-      register
+      loginWithGoogle,
+      logout
     }}>
       {children}
     </AuthContext.Provider>