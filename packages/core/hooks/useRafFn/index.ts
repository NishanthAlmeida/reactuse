import { useCallback, useEffect, useMemo, useRef } from "react";
import useLatest from "../useLatest";

export type RafLoopReturns = readonly [() => void, () => void, () => boolean];

export default function useRafFn(
  callback: FrameRequestCallback,
  initiallyActive = true,
): RafLoopReturns {
  const raf = useRef<number | null>(null);
  const rafActivity = useRef<boolean>(false);
  const rafCallback = useLatest(callback);

  const step = useCallback(
    (time: number) => {
      if (rafActivity.current) {
        rafCallback.current(time);
        raf.current = requestAnimationFrame(step);
      }
    },
    [rafCallback],
  );

  const result = useMemo(
    () =>
      [
        () => {
          // stop
          if (rafActivity.current) {
            rafActivity.current = false;
            raf.current && cancelAnimationFrame(raf.current);
          }
        },
        () => {
          // start
          if (!rafActivity.current) {
            rafActivity.current = true;
            raf.current = requestAnimationFrame(step);
          }
        },
        (): boolean => rafActivity.current, // isActive
      ] as const,
    [step],
  );

  useEffect(() => {
    if (initiallyActive) {
      result[1]();
    }

    return result[0];
  }, [initiallyActive, result]);

  return result;
}
