import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  // Optional smaller fallback for widget-level boundaries (e.g. a single 3D scene)
  // instead of the full-page fallback.
  compact?: boolean;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.compact) {
      return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          <p className="text-sm text-gray-600">This widget couldn't load on your device.</p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try again
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center pt-24">
        <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-amber-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Something went wrong</h1>
        <p className="text-gray-600 max-w-md">
          This page hit an error and couldn't render. This can happen on some devices with
          limited graphics support. Try reloading the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reload Page
        </button>
      </div>
    );
  }
}
