export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-state-label">Something went wrong</div>
      <div className="error-state-message">{message}</div>
      {onRetry ? (
        <button className="button button-secondary" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}