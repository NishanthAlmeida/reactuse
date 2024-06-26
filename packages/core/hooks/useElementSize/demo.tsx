import { useElementSize } from "@reactuses/core";
import { useRef } from "react";

export default () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [width, height] = useElementSize(ref, { box: "border-box" });

  return (
    <div>
      <div>Resize the box to see changes</div>
      <br />
      <textarea
        ref={ref}
        disabled
        style={{ width: 200, height: 200 }}
        value={`width: ${width}\nheight: ${height}`}
      />
    </div>
  );
};
