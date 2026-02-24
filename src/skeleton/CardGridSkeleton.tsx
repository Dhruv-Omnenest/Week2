import React from 'react';
 
interface CardGridSkeletonProps {
  count?: number; 
}

const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '400px 100%',
  animation: 'shimmer 1.4s ease-in-out infinite',
  borderRadius: 4,
};
 
const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        marginBottom: 24,
      }}>
        {Array.from({ length: count }).map(function(_, cardIndex) {
          return (
            <div key={cardIndex} style={{
              border: '1px solid #D1D5DB',
              borderRadius: 8,
              padding: 16,
            }}>
              <div style={{ ...shimmerStyle, height: 18, width: '60%', marginBottom: 10 }} />
              <div style={{ ...shimmerStyle, height: 16, width: '40%', marginBottom: 8 }} />
              <div style={{ ...shimmerStyle, height: 14, width: '50%', marginBottom: 8 }} />
              <div style={{ ...shimmerStyle, height: 12, width: '35%' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
 
export default CardGridSkeleton;