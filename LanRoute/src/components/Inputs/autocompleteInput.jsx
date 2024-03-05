import React, { useState } from "react";

const AutocompleteInput = ({ suggestions, value, onChange, onSelect }) => {
  const [query, setQuery] = useState(value);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onChange(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const newTag = query.trim();
      if (newTag && suggestions.includes(newTag)) {
        onSelect(newTag);
        setQuery("");
      }
    }
  };

  // Render tag suggestions as a dropdown list below the input field
  const renderSuggestions = () => {
    const filteredSuggestions = suggestions.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
    return filteredSuggestions.map((suggestion) => (
      <div
        key={suggestion}
        onClick={() => onSelect(suggestion)}
        style={{ cursor: "pointer" }}
      >
        {suggestion}
      </div>
    ));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag..."
      />
      {query && <div>{renderSuggestions()}</div>}
    </div>
  );
};

export default AutocompleteInput;
