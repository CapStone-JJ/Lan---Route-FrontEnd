import React, { useState } from 'react';

const AutocompleteInput = () => {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const newTag = query.trim();
      if (newTag) {
        setSelectedTags([...selectedTags, newTag]);
        setQuery('');
      }
    }
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
      <div>
        Selected Tags: {selectedTags.join(', ')}
      </div>
    </div>
  );
};

export default AutocompleteInput;





