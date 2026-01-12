// client/src/App.jsx

import React, { lazy, Suspense } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
const TermsAndConditionsScreen = lazy(() => import('./pages/TermsAndConditionsScreen'));
const VerifyCertificateScreen = lazy(() => import('./pages/VerifyCertificateScreen'));
const DashboardScreen = lazy(() => import('./pages/DashboardScreen'));
const QuizScreen = lazy(() => import('./pages/QuizScreen'));
const ResultScreen = lazy(() => import('./pages/ResultScreen'));
const HistoryScreen = lazy(() => import('./pages/HistoryScreen'));
const AdminDashboardScreen = lazy(() => import('./pages/AdminDashboardScreen'));

function App() {
  return (
    <Router>
      {/* LAYOUT WRAPPER:
          min-h-screen: Ensures the container is at least the height of the viewport.
          flex flex-col: Stacks children (Header, Main, Footer) vertically.
      */}
      <div className="flex flex-col min-h-screen">
        
        <Header />

        {/* flex-grow: This is the magic class. 
            It tells the main content to take up ALL available space, 
            effectively pushing the Footer to the bottom.
        */}
        <main className='flex-grow py-3'>
          <Suspense fallback={<div className="text-center py-10 text-xl text-blue-600">Loading Content...</div>}>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
              <Route path='/resetpassword/:resettoken' element={<ResetPasswordScreen />} />
              <Route path='/faq' element={<FAQScreen />} />
              <Route path='/about' element={<AboutUsScreen />} />
              <Route path='/contact' element={<ContactUsScreen />} />
              <Route path='/privacy-policy' element={<PrivacyPolicyScreen />} />
              <Route path='/terms' element={<TermsAndConditionsScreen />} />
              <Route path='/verify-certificate/:id' element={<VerifyCertificateScreen />} />
              
              <Route path='' element={<PrivateRoute />}>
                <Route path='/dashboard' element={<DashboardScreen />} />
                <Route path='/quiz' element={<QuizScreen />} /> 
                <Route path='/result/:id' element={<ResultScreen />} />
                <Route path='/history' element={<HistoryScreen />} />
              </Route>
              
              <Route path='' element={<PrivateRoute adminOnly={true} />}>
                <Route path='/admin' element={<AdminDashboardScreen />} />
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