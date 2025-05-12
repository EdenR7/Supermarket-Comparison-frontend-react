import { useRef, useCallback, useEffect } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return debounced;
}
