import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full space-y-8 text-center p-10 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-extrabold text-gray-900">Something went wrong</h2>
            <p className="mt-2 text-sm text-gray-600">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="mt-5">
                <button
                    onClick={() => window.location.reload()}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Refresh Page
                </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 text-left bg-red-50 p-4 rounded text-xs text-red-800 overflow-auto max-h-40">
                    {this.state.error?.toString()}
                </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
