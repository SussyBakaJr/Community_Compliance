import { useCallback, useEffect, useState } from "react";

export function useAsync(asyncFn, dependencies = [], options = {}) {
  const { onError, onSuccess } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      setData(result);
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      const message = err?.message || "Something went wrong";
      setError(message);
      if (onError) {
        onError(message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFn, onError, onSuccess, ...dependencies]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}