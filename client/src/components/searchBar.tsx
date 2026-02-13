import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { CitySuggestion } from "../types/locationTypes";
import { Props } from "../types/searchBar_Types";

export const SearchBar: FC<Props> = ({
  suggestions,
  onSelect,
  onChange,
  onSubmit,
  disabled
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      onSubmit(query.trim());
      setQuery("");
    }
  };

  const handleSelect = (suggestion: CitySuggestion) => {
    setQuery(suggestion.name);
    onSelect(suggestion);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">

      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
          🔍
        </span>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city and press Enter"
          disabled={disabled}
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:opacity-50"
        />
      </div>

      {query && suggestions.length > 0 && (
        <ul className="absolute mt-3 w-full bg-white rounded-2xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-20">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => handleSelect(s)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition flex flex-col"
            >
              <span className="font-medium text-gray-800">
                {s.name}
              </span>
              <span className="text-sm text-gray-500">
                {s.region}, {s.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};