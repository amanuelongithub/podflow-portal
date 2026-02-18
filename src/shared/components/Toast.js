import React, { createContext, useState, useContext, useEffect } from "react";

// Toast Types
const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Create Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Auto-remove toasts after 5 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = React.useCallback(
    (message, type = TOAST_TYPES.INFO, duration = 5000) => {
      const id = Date.now();
      const newToast = { id, message, type, duration };
      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration
      setTimeout(() => {
        removeToast(id);
      }, duration);

      return id;
    },
    [removeToast],
  );

  const success = React.useCallback(
    (message, duration) => {
      return showToast(message, TOAST_TYPES.SUCCESS, duration);
    },
    [showToast],
  );

  const error = React.useCallback(
    (message, duration) => {
      return showToast(message, TOAST_TYPES.ERROR, duration);
    },
    [showToast],
  );

  const warning = React.useCallback(
    (message, duration) => {
      return showToast(message, TOAST_TYPES.WARNING, duration);
    },
    [showToast],
  );

  const info = React.useCallback(
    (message, duration) => {
      return showToast(message, TOAST_TYPES.INFO, duration);
    },
    [showToast],
  );

  const clearAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      success,
      error,
      warning,
      info,
      clearAll,
    }),
    [success, error, warning, info, clearAll],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  const position = "top-right"; // Can be 'top-right', 'top-left', 'bottom-right', 'bottom-left'

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      default:
        return "top-4 right-4";
    }
  };

  const getToastClasses = (type) => {
    const baseClasses =
      "rounded-lg shadow-lg p-4 mb-3 transform transition-all duration-300 ease-in-out max-w-sm";

    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return `${baseClasses} bg-green-50 border-l-4 border-green-500`;
      case TOAST_TYPES.ERROR:
        return `${baseClasses} bg-red-50 border-l-4 border-red-500`;
      case TOAST_TYPES.WARNING:
        return `${baseClasses} bg-yellow-50 border-l-4 border-yellow-500`;
      case TOAST_TYPES.INFO:
        return `${baseClasses} bg-blue-50 border-l-4 border-blue-500`;
      default:
        return `${baseClasses} bg-gray-50 border-l-4 border-gray-500`;
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return (
          <svg
            className='w-5 h-5 text-green-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        );
      case TOAST_TYPES.ERROR:
        return (
          <svg
            className='w-5 h-5 text-red-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        );
      case TOAST_TYPES.WARNING:
        return (
          <svg
            className='w-5 h-5 text-yellow-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        );
      case TOAST_TYPES.INFO:
        return (
          <svg
            className='w-5 h-5 text-blue-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={getToastClasses(toast.type)}
          role='alert'
        >
          <div className='flex items-start'>
            <div className='flex-shrink-0 pt-0.5'>{getIcon(toast.type)}</div>
            <div className='ml-3 flex-1'>
              <p
                className={`text-sm font-medium ${
                  toast.type === TOAST_TYPES.SUCCESS
                    ? "text-green-800"
                    : toast.type === TOAST_TYPES.ERROR
                    ? "text-red-800"
                    : toast.type === TOAST_TYPES.WARNING
                    ? "text-yellow-800"
                    : "text-blue-800"
                }`}
              >
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className='ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500'
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          {/* Progress bar */}
          <div className='mt-2'>
            <div
              className={`h-1 rounded-full ${
                toast.type === TOAST_TYPES.SUCCESS
                  ? "bg-green-200"
                  : toast.type === TOAST_TYPES.ERROR
                  ? "bg-red-200"
                  : toast.type === TOAST_TYPES.WARNING
                  ? "bg-yellow-200"
                  : "bg-blue-200"
              }`}
            >
              <div
                className={`h-full rounded-full ${
                  toast.type === TOAST_TYPES.SUCCESS
                    ? "bg-green-500"
                    : toast.type === TOAST_TYPES.ERROR
                    ? "bg-red-500"
                    : toast.type === TOAST_TYPES.WARNING
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
                style={{
                  animation: `shrink ${toast.duration}ms linear forwards`,
                }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add CSS for animation */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Custom Hook for using toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
