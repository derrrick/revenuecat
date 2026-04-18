import { useState } from "react";
import { Search } from "../../icons/Icon";
import "./SearchInput.css";

type Props = {
  placeholder?: string;
  width?: number;
};

export function SearchInput({ placeholder = "Search", width }: Props) {
  const [value, setValue] = useState("");
  return (
    <div className="search" style={width ? { width: `${width}px` } : undefined}>
      <Search className="search__icon" />
      <input
        className="search__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
