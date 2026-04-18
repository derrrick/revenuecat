import type { SVGProps } from "react";

type Props = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: string;
  size?: number;
};

/* References the demo's hosted SVG sprites, identical to demo DOM:
   <use href="/icons/{name}.svg#base" fill="currentColor" />
   <use href="/icons/{name}.svg#details" fill="currentColor" />
*/
export function CatIcon({ name, size = 16, className, ...rest }: Props) {
  const src = `/icons/${name}.svg`;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <use className="base" href={`${src}#base`} fill="currentColor" />
      <use className="details" href={`${src}#details`} fill="currentColor" />
    </svg>
  );
}
