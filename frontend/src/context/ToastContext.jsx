import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info", duration = 4000) => {
    setToast({ message, type });
    const existing = window.__community_compliance_toast_timeout;
    if (existing) {
      window.clearTimeout(existing);
    }
    window.__community_compliance_toast_timeout = window.setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast ? (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-message">{toast.message}</div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}