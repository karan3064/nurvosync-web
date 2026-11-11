import { useState, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: string })?.from || '/demo';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <span className="w-3 h-3 bg-signal mb-4" />
          <h1 className="text-2xl font-serif font-medium text-ink">Clinician Portal</h1>
          <p className="text-muted text-sm mt-2 text-center">
            Sign in to access live gait analysis and patient reports.
          </p>
        </div>

        <div className="bg-surface border border-hairline p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="spec-label block mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface border border-hairline text-ink placeholder-muted/60 focus:outline-none focus:border-ink"
                placeholder="doctor@hospital.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="spec-label block mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface border border-hairline text-ink placeholder-muted/60 focus:outline-none focus:border-ink"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-ink text-paper font-medium text-sm hover:bg-signal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-sm mt-6">
          Not a registered doctor?{' '}
          <Link to="/partners" className="text-signal hover:underline">
            Contact us to get access
          </Link>
        </p>
      </div>
    </div>
  );
}
