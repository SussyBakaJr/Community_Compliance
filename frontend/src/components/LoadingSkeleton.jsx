export default function LoadingSkeleton({ lines = 4 }) {
  return (
    <div className="skeleton-card">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-line" />
      ))}
    </div>
  );
}