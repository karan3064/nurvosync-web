import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, signOut } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setMobileOpen(false);
    await signOut();
    navigate('/');
  };

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors ${
      isActive(path) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block px-2 py-3 text-base font-medium border-b border-gray-100 transition-colors ${
      isActive(path) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105">
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              NurvoSync
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>

            <Link to="/demo" className={navLinkClass('/demo')}>
              Live Demo
            </Link>

            <Link to="/partners" className={navLinkClass('/partners')}>
              Partners
            </Link>

            <Link to="/about" className={navLinkClass('/about')}>
              About
            </Link>

            {session ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link to="/login" className={navLinkClass('/login')}>
                Doctor Login
              </Link>
            )}

            {/* CTA BUTTON */}
            <Link
              to="/partners"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
            >
              Partner With Us
            </Link>
          </div>

          {/* MOBILE HAMBURGER TOGGLE */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-gray-700"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* MOBILE MENU PANEL */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-100 pt-2">
            <Link to="/" className={mobileNavLinkClass('/')}>
              Home
            </Link>
            <Link to="/demo" className={mobileNavLinkClass('/demo')}>
              Live Demo
            </Link>
            <Link to="/partners" className={mobileNavLinkClass('/partners')}>
              Partners
            </Link>
            <Link to="/about" className={mobileNavLinkClass('/about')}>
              About
            </Link>

            {session ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-1.5 px-2 py-3 text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link to="/login" className={mobileNavLinkClass('/login')}>
                Doctor Login
              </Link>
            )}

            <Link
              to="/partners"
              className="mt-4 block text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-sm"
            >
              Partner With Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
