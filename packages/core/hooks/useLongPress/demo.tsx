import { useLongPress } from "@reactuses/core";
import { useState } from "react";

export default () => {
  const [state, setState] = useState("No Press");
  const onLongPress = () => {
    setState("Long Pressed!");
  };

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  return (
    <div>
      <button {...longPressEvent}>useLongPress</button>
      <button onClick={() => setState("No Press")}>Reset</button>
      <div>Pressed: {state}</div>
    </div>
  );
};
