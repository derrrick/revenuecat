import "./Toggle.css";

type Props = {
  on: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
};

export function Toggle({ on, onChange, size = "sm" }: Props) {
  return (
    <button
      role="switch"
      aria-checked={on}
      className={`toggle toggle--${size} ${on ? "toggle--on" : ""}`}
      onClick={() => onChange(!on)}
      type="button"
    >
      <span className="toggle__knob" />
    </button>
  );
}
