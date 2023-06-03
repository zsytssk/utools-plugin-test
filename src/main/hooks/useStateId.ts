import { useCallback, useState } from 'react';

export function useStateId(max = 100) {
  const [stateId, setStateId] = useState(0);
  const updateFn = useCallback(() => {
    setStateId((old) => {
      let newId = old + 1;
      if (newId > max) {
        newId = 0;
      }
      return newId;
    });
  }, [max]);

  return [stateId, updateFn] as const;
}
