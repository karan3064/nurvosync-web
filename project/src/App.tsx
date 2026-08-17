import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AnimatedPage from './components/AnimatedPage';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Demo from './pages/Demo';
import Login from './pages/Login';
import Partners from './pages/Partners';
import About from './pages/About';
import Settings from './pages/Settings';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/experience" element={<AnimatedPage><Experience /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route
          path="/demo"
          element={
            <ProtectedRoute>
              <AnimatedPage><Demo /></AnimatedPage>
            </ProtectedRoute>
          }
        />
        <Route path="/partners" element={<AnimatedPage><Partners /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-900">
          <ScrollToTop />
          <Header />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
