import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2, Stethoscope, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Are you a doctor?</h1>
          <p className="text-gray-600 mb-8">
            The live gait-analysis demo and patient reports are only available to registered
            clinicians. Log in with your doctor account to continue.
          </p>
          <Link
            to="/login"
            state={{ from: location.pathname }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Log In as a Doctor
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            Not a doctor?{' '}
            <Link to="/partners" className="text-cyan-600 hover:text-cyan-700">
              Learn more about NurvoSync
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
