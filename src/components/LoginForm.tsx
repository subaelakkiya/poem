@@ .. @@
 import React, { useState } from 'react';
-import { Mail, Lock, User, Eye, EyeOff, BookOpen } from 'lucide-react';
+import { BookOpen } from 'lucide-react';
 import { useAuth } from '../contexts/AuthContext';

@@ .. @@
 const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
-  const [isLogin, setIsLogin] = useState(true);
-  const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
-  const [formData, setFormData] = useState({
-    name: '',
-    email: '',
-    password: ''
-  });
 
-  const { login, register } = useAuth();
+  const { loginWithGoogle } = useAuth();

-  const handleSubmit = async (e: React.FormEvent) => {
-    e.preventDefault();
+  const handleGoogleLogin = async () => {
     setLoading(true);
 
     try {
-      let success = false;
-      if (isLogin) {
-        success = await login(formData.email, formData.password);
-      } else {
-        success = await register(formData.name, formData.email, formData.password);
-      }
+      const success = await loginWithGoogle();
 
       if (success) {
         onClose();
       } else {
-        alert('Authentication failed. Please try again.');
+        alert('Google sign-in failed. Please try again.');
       }
     } catch (error) {
       alert('An error occurred. Please try again.');
@@ .. @@
           </div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">
-            {isLogin ? 'வரவேற்கிறோம்' : 'பதிவு செய்யுங்கள்'}
+            வரவேற்கிறோம்
           </h2>
           <p className="text-gray-600">
-            {isLogin ? 'Welcome Back' : 'Join Our Poetry Community'}
+            Welcome to Poetry Community
           </p>
         </div>

-        <form onSubmit={handleSubmit} className="space-y-6">
-          {!isLogin && (
-            <div>
-              <label className="block text-sm font-medium text-gray-700 mb-2">
-                பெயர் (Name)
-              </label>
-              <div className="relative">
-                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
-                <input
-                  type="text"
-                  value={formData.name}
-                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
-                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
-                  placeholder="உங்கள் பெயரை உள்ளிடுங்கள்"
-                  required={!isLogin}
-                />
-              </div>
-            </div>
-          )}
-
-          <div>
-            <label className="block text-sm font-medium text-gray-700 mb-2">
-              மின்னஞ்சல் (Email)
-            </label>
-            <div className="relative">
-              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
-              <input
-                type="email"
-                value={formData.email}
-                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
-                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
-                placeholder="your@email.com"
-                required
-              />
-            </div>
-          </div>
-
-          <div>
-            <label className="block text-sm font-medium text-gray-700 mb-2">
-              கடவுச்சொல் (Password)
-            </label>
-            <div className="relative">
-              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
-              <input
-                type={showPassword ? 'text' : 'password'}
-                value={formData.password}
-                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
-                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
-                placeholder="••••••••"
-                required
-              />
-              <button
-                type="button"
-                onClick={() => setShowPassword(!showPassword)}
-                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
-              >
-                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
-              </button>
-            </div>
-          </div>
-
-          <button
-            type="submit"
-            disabled={loading}
-            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50"
-          >
-            {loading ? 'Loading...' : (isLogin ? 'உள்நுழைய (Login)' : 'பதிவு செய் (Register)')}
-          </button>
-        </form>
-
-        <div className="mt-6 text-center">
-          <p className="text-gray-600">
-            {isLogin ? "Don't have an account?" : 'Already have an account?'}
+        <div className="space-y-4">
+          <p className="text-center text-gray-600 mb-6">
+            Sign in with your Google account to access the poetry collection
           </p>
+          
           <button
-            onClick={() => setIsLogin(!isLogin)}
-            className="text-orange-500 hover:text-orange-600 font-semibold mt-1"
+            onClick={handleGoogleLogin}
+            disabled={loading}
+            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-3"
           >
-            {isLogin ? 'பதிவு செய்யுங்கள் (Register)' : 'உள்நுழைய (Login)'}
+            <svg className="w-5 h-5" viewBox="0 0 24 24">
+              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
+              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
+              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
+              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
+            </svg>
+            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
           </button>
         </div>
       </div>