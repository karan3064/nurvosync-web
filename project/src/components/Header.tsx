import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
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
      isActive(path) ? 'text-ink' : 'text-muted hover:text-ink'
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block px-2 py-3 text-base font-medium border-b border-hairline transition-colors ${
      isActive(path) ? 'text-ink' : 'text-muted hover:text-ink'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-hairline">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-signal flex-shrink-0" />
            <span className="text-xl font-serif font-medium text-ink tracking-tight">
              NurvoSync
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass('/')}>
              Home
            </Link>

            <Link to="/experience" className={navLinkClass('/experience')}>
              Experience
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

            {session && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}

            {/* CTA BUTTON */}
            <Link
              to="/#contact"
              className="px-5 py-2.5 bg-ink text-paper font-medium text-sm hover:bg-signal transition-colors"
            >
              Request a Pilot
            </Link>
          </div>

          {/* MOBILE HAMBURGER TOGGLE */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-ink"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* MOBILE MENU PANEL */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-hairline pt-2">
            <Link to="/" className={mobileNavLinkClass('/')}>
              Home
            </Link>
            <Link to="/experience" className={mobileNavLinkClass('/experience')}>
              Experience
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

            {session && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-1.5 px-2 py-3 text-base font-medium text-muted hover:text-ink transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}

            <Link
              to="/#contact"
              className="mt-4 block text-center px-6 py-3 bg-ink text-paper font-medium text-sm"
            >
              Request a Pilot
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
