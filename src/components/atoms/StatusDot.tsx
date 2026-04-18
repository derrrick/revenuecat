import "./StatusDot.css";

type Props = {
  color?: string;
  size?: number;
};

export function StatusDot({ color = "var(--color-status-dot)", size = 8 }: Props) {
  return (
    <span
      className="status-dot"
      style={{ width: size, height: size, background: color }}
    />
  );
}
