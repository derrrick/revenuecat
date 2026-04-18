import "./Breadcrumb.css";

type Crumb = {
  label: string;
  href?: string;
  active?: boolean;
};

type Props = {
  crumbs: Crumb[];
};

export function Breadcrumb({ crumbs }: Props) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={i} className="breadcrumb__group">
          {c.href && !c.active ? (
            <a href={c.href} className="breadcrumb__link">
              {c.label}
            </a>
          ) : (
            <span className={`breadcrumb__crumb ${c.active ? "is-active" : ""}`}>
              {c.label}
            </span>
          )}
          {i < crumbs.length - 1 && <span className="breadcrumb__sep">/</span>}
        </span>
      ))}
    </nav>
  );
}
