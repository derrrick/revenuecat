import "./Avatar.css";

type Props = {
  label?: string;
  bg?: string;
  size?: number;
  square?: boolean;
};

export function Avatar({ label = "D", bg = "#F4A8BE", size = 32, square }: Props) {
  return (
    <div
      className={`avatar ${square ? "avatar--square" : ""}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.45 }}
    >
      {label.slice(0, 1).toUpperCase()}
    </div>
  );
}
