import { RenderHookResult, renderHook, act } from "@testing-library/react";
import { DebouncedFunc } from "lodash";
import useDebounceFn from "../../hooks/useDebounceFn";
import { sleep } from "../utils/testingHelpers";

interface ParamsObj {
  fn: (...arg: any) => any;
  deps?: any[];
  wait: number;
}

let count = 0;
const debounceFn = (gap: number) => {
  count += gap;
};

const setUp = ({ fn, wait }: ParamsObj) =>
  renderHook(() => useDebounceFn(fn, wait));

let hook: RenderHookResult<
  {
    run: DebouncedFunc<(...args: any) => any>;
    cancel: () => void;
    flush: () => any;
  },
  unknown
>;
describe(useDebounceFn, () => {
  it("run, cancel and flush should work", async () => {
    act(() => {
      hook = setUp({
        fn: debounceFn,
        wait: 200,
      });
    });
    await act(async () => {
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      expect(count).toBe(0);
      await sleep(300);
      expect(count).toBe(2);

      hook.result.current.run(4);
      expect(count).toBe(2);
      await sleep(300);
      expect(count).toBe(6);

      hook.result.current.run(4);
      expect(count).toBe(6);
      hook.result.current.cancel();
      expect(count).toBe(6);
      await sleep(300);
      expect(count).toBe(6);

      hook.result.current.run(1);
      expect(count).toBe(6);
      hook.result.current.flush();
      expect(count).toBe(7);
      await sleep(300);
      expect(count).toBe(7);
    });
  });
});
