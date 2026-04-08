import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({ children, onRetry }) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const handleError = (event) => {
      setHasError(true);
      setError(event.reason || event.message);
    };

    window.addEventListener('unhandledrejection', handleError);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleError);
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="max-w-md bg-dark-800 rounded-lg p-8 border border-dark-700">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-red-600" size={32} />
            <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          </div>
          <p className="text-gray-400 mb-6">{error || 'An unexpected error occurred'}</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasError(false);
                setError(null);
                onRetry?.();
              }}
              className="flex items-center gap-2 flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded transition"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-4 border-dark-700 border-t-red-600 rounded-full animate-spin`}></div>
    </div>
  );
}

export function EmptyState({ message = 'No content available', icon: Icon = AlertCircle }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Icon className="text-gray-600 mb-4" size={48} />
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded p-4 flex items-start gap-3">
      <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
      <div className="flex-1">
        <p className="text-red-200 text-sm">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-red-400 hover:text-red-300 text-sm font-medium transition"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export function SkeletonLoader({ count = 4, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-dark-800 rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-video bg-dark-700"></div>
          <div className="p-3 space-y-2">
            <div className="h-4 bg-dark-700 rounded w-3/4"></div>
            <div className="h-3 bg-dark-700 rounded w-1/2"></div>
            <div className="h-3 bg-dark-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
