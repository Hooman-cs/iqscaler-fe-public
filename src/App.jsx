// client/src/App.jsx

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // <-- 1. Import useSelector
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './pages/HomeScreen';
import FAQScreen from './pages/FAQScreen';
import AboutUsScreen from './pages/AboutUsScreen';
import ContactUsScreen from './pages/ContactUsScreen';

// LAZY IMPORTS
const LoginScreen = lazy(() => import('./pages/LoginScreen'));
const RegisterScreen = lazy(() => import('./pages/RegisterScreen'));
const ForgotPasswordScreen = lazy(() => import('./pages/ForgotPasswordScreen'));
const ResetPasswordScreen = lazy(() => import('./pages/ResetPasswordScreen'));
const PrivacyPolicyScreen = lazy(() => import('./pages/PrivacyPolicyScreen'));
const TermsAndConditionsScreen = lazy(
  () => import('./pages/TermsAndConditionsScreen'),
);
const VerifyCertificateScreen = lazy(
  () => import('./pages/VerifyCertificateScreen'),
);
const DashboardScreen = lazy(() => import('./pages/DashboardScreen'));
const QuizScreen = lazy(() => import('./pages/QuizScreen'));
const ResultScreen = lazy(() => import('./pages/ResultScreen'));
const HistoryScreen = lazy(() => import('./pages/HistoryScreen'));
const AdminDashboardScreen = lazy(() => import('./pages/AdminDashboardScreen'));
const RefundPolicyScreen = lazy(() => import('./pages/RefundPolicyScreen'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const UserPaymentHistory = lazy(() => import('./pages/UserPaymentHistory'));

function App() {
  // 2. Grab userInfo to determine if the sub-navbar is visible
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />

        {/* 3. DYNAMIC MARGIN FIX: 
            Mobile is always mt-16 (64px). 
            Desktop is mt-20 (80px) normally, but expands to mt-[120px] to make room for the sub-navbar! 
        */}
        <main
          className={`flex-grow ${userInfo ? "mt-[120px] md:mt-[128px]" : "mt-16 md:mt-20"}`}
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route
                path="/forgotpassword"
                element={<ForgotPasswordScreen />}
              />
              <Route
                path="/resetpassword/:resettoken"
                element={<ResetPasswordScreen />}
              />
              <Route path="/faq" element={<FAQScreen />} />
              <Route path="/about" element={<AboutUsScreen />} />
              <Route path="/contact" element={<ContactUsScreen />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditionsScreen />}
              />
              <Route
                path="/verify-certificate/:id"
                element={<VerifyCertificateScreen />}
              />
              <Route path="/refund-policy" element={<RefundPolicyScreen />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />

              {/* PRIVATE ROUTES (Standard Users) */}
              <Route path="" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/quiz" element={<QuizScreen />} />
                <Route path="/result/:id" element={<ResultScreen />} />
                <Route path="/history" element={<HistoryScreen />} />
                <Route
                  path="/payment-history"
                  element={<UserPaymentHistory />}
                />
              </Route>

              {/* ADMIN ROUTES */}
              <Route path="" element={<PrivateRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboardScreen />} />
              </Route>
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
