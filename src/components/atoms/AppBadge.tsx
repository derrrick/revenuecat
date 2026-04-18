import "./AppBadge.css";

type Props = {
  letter: string;
  bg?: string;
};

export function AppBadge({ letter, bg = "#CBE08F" }: Props) {
  return (
    <span className="app-badge" style={{ background: bg }}>
      {letter.slice(0, 1).toUpperCase()}
    </span>
  );
}
