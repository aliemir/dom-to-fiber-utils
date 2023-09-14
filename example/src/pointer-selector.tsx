import React from "react";
import { useSelector } from "./use-selector";

export const PointerSelector = () => {
  const [active, setActive] = React.useState(true);
  const { rect, name } = useSelector(active);

  React.useEffect(() => {
    const currentCursor = document.body.style.cursor;

    if (active) {
      document.body.style.cursor = "crosshair";
    }

    return () => {
      document.body.style.cursor = currentCursor;
    };
  }, [active]);

  return (
    <div>
      <button
        id="selector-toggle"
        className={active ? "active" : ""}
        onClick={() => {
          setActive((active) => !active);
        }}
      >
        toggle selector
      </button>
      {active && <SelectorBox {...rect} name={name} />}
    </div>
  );
};

const SelectorBox = ({
  width,
  height,
  x,
  y,
  name,
}: {
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
}) => {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: -6,
        top: -6,
        opacity: name ? 1 : 0,
        transform: `translate(${x}px, ${y}px)`,
        width: width + 10,
        height: height + 10,
        transition: "all 0.2s ease-in-out",
        border: "1px solid #6C7793",
        borderRadius: "4px",
        mixBlendMode: "difference",
        borderTopLeftRadius: 0,
        fontSize: "10px",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-26px",
          left: "-1px",
          background: "#1D1E30",
          padding: "4px 6px",
          border: "1px solid #6C7793",
          borderBottomWidth: 0,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#CFD7E2",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          display: name ? "block" : "none",
        }}
      >
        {name}
      </div>
    </div>
  );
};
