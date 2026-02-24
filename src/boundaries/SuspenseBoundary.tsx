import React, { Suspense, type ReactNode,  } from 'react';
import ErrorBoundary from './ErrorBoundry';
 
interface SuspenseBoundaryProps {
  children:       ReactNode; 
  fallback:       ReactNode;
  errorFallback?: ReactNode;  
}
 
const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({
  children,
  fallback,
  errorFallback,
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
 
    </ErrorBoundary>
  );
};
 
export default SuspenseBoundary;
