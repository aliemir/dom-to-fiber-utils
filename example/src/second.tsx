import { ThirdComponent } from "./third";

export const SecondComponent = () => {
  return (
    <div
      style={{
        padding: "1rem",
        fontSize: "1.5rem",
        lineHeight: "2rem",
        fontWeight: 500,
        background: "lavender",
      }}
    >
      <div>
        <span
          style={{
            color: "white",
            mixBlendMode: "difference",
          }}
        >
          Second Component
        </span>
      </div>
      <ThirdComponent />
    </div>
  );
};
