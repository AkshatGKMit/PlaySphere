import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const useQueryKeys = () => {
  const queryClient = useQueryClient();

  const allKeys = useMemo(() => {
    const allQueryKeys = queryClient
      .getQueryCache()
      .getAll()
      .map((query) => query.queryKey);
    return allQueryKeys;
  }, [queryClient]);

  const getKeysContaining = useCallback(
    (key: string) => {
      return allKeys.filter(
        (queryKey) =>
          Array.isArray(queryKey) && queryKey.some((k) => typeof k === 'string' && k.includes(key)),
      );
    },
    [allKeys],
  );

  return { allKeys, getKeysContaining };
};

export default useQueryKeys;
