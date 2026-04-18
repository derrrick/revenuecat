import "./Pill.css";

type Tone = "renewal" | "newsub" | "trial";

type Props = {
  tone?: Tone;
  children: string;
};

export function Pill({ tone = "renewal", children }: Props) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}
