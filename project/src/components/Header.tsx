import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';


export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105">
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              NurvoSync
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/demo"
              className={`text-sm font-medium transition-colors ${
                isActive('/demo') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Demo
              <Link
  to="/settings"
  className="text-gray-300 hover:text-cyan-400"
>
  Settings
</Link>

            </Link>
            <Link
              to="/partners"
              className={`text-sm font-medium transition-colors ${
                isActive('/partners') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Partners
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/partners"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
            >
              Partner With Us
            </Link>
          </div>

          <div className="md:hidden">
            <Link
              to="/partners"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-sm"
            >
              Partner
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
