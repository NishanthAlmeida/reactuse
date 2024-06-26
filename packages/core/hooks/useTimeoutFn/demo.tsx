import { useTimeoutFn } from "@reactuses/core";
import { useState } from "react";

export default () => {
  const [text, setText] = useState("Please wait for 3 seconds");
  const [isPending, start] = useTimeoutFn(
    () => {
      setText("Fired!");
    },
    3000,
    { immediate: false },
  );

  return (
    <div>
      <p>{text}</p>
      <button
        onClick={() => {
          setText("Please wait for 3 seconds");
          start();
        }}
      >
        {isPending ? "Pending" : "Restart"}
      </button>
    </div>
  );
};
