import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children:  ReactNode;  
  fallback?: ReactNode;  
}
 
interface ErrorBoundaryState {
  hasError: boolean;    
  error:    Error | null; 
}
 
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
 
  constructor(props: ErrorBoundaryProps) {
    super(props);  
    this.state = {
      hasError: false, 
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
    };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary caught an error]', error, info.componentStack);
  }
 
  render() {
    if (this.state.hasError === true) {
       if (this.props.fallback) {
        return this.props.fallback;
      }
       var errorMessage = this.state.error
        ? this.state.error.message
        : 'An unexpected error occurred.';
 
      return (
        <div style={{
          padding: 24,
          border: '1px solid #FCA5A5',
          borderRadius: 8,
          background: '#FEF2F2',
          color: '#991B1B',
        }}>
          <h3 style={{ marginTop: 0 }}>⚠️ Something went wrong</h3>
          <p style={{ fontSize: 14 }}>{errorMessage}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}
            style={{
              padding: '6px 14px',
              border: '1px solid #FCA5A5',
              borderRadius: 4,
              background: '#fff',
              cursor: 'pointer',
              color: '#991B1B',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
     return this.props.children;
  }
}
 
export default ErrorBoundary;