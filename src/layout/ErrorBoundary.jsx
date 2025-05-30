import React from "react";
import ErrorComponent from "./ErrorComponent";

/**
 * Error boundary component for catching and displaying errors in child components
 * @class ErrorBoundary
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Log additional context if provided
    if (this.props.context) {
      console.error("Error context:", this.props.context);
    }
  }

  render() {
    if (this.state.hasError) {
      // Determine the error message
      const errorMessage =
        this.props.fallbackMessage ||
        `Error loading ${this.props.context?.component || "component"}: ${this.state.error?.message || "Unknown error"}`;

      // Use custom fallback if provided, otherwise use default error component
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorComponent message={errorMessage} />;
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap a component with error boundary
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {Object} options - Options for error boundary
 * @param {string} options.component - Name of component for error messages
 * @param {string} options.fallbackMessage - Custom fallback message
 * @returns {React.Component} Wrapped component with error boundary
 */
export function withErrorBoundary(WrappedComponent, options = {}) {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary
        context={{ component: options.component }}
        fallbackMessage={options.fallbackMessage}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;
