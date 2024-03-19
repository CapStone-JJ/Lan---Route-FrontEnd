import React from "react";

function SearchInput({ value, onChange }) {
  return <input placeholder="Search.." type="text" value={value} onChange={onChange} />;
}

export default SearchInput;



