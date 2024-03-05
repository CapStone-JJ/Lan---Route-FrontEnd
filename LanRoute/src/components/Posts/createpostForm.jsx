import React, { useState } from "react";
import { useAddPostMutation } from "../../api/posts";
import { useGetTagsQuery, useAddTagMutation } from "../../api/tags";
import AutocompleteInput from "../Inputs/autocompleteInput";

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // RTK Query hooks for adding a post and fetching/adding tags
  const [addPost, { isLoading: isPosting }] = useAddPostMutation();
  const { data: tags, isLoading: isLoadingTags } = useGetTagsQuery();
  const [addTag] = useAddTagMutation();

  // Handle change in post content
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Handle selecting a tag from autocomplete
  const handleSelectTag = async (tagName) => {
    // Check if the tag is already selected
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);

      // Optionally, add a new tag if it doesn't exist in the fetched tags
      if (!tags.some((tag) => tag.name === tagName)) {
        await addTag({ name: tagName });
      }
    }
  };

  // Handle removing a selected tag
  const handleRemoveTag = (tagName) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
  };

  // Handle submitting the post
  const handleSubmit = async () => {
    if (content.trim()) {
      try {
        await addPost({
          content,
          tags: selectedTags.map((tag) => ({ name: tag })),
        }).unwrap();
        setContent("");
        setSelectedTags([]);
        if (onPostCreated) onPostCreated();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div>
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={handleContentChange}
      />
      <AutocompleteInput
        suggestions={tags?.map((tag) => tag.name) || []}
        onSelect={handleSelectTag}
      />
      <div>
        {selectedTags.map((tag, index) => (
          <span key={index} onClick={() => handleRemoveTag(tag)}>
            {tag}
          </span> // Click to remove tag
        ))}
      </div>
      <button onClick={handleSubmit} disabled={isPosting}>
        Post
      </button>
    </div>
  );
};

export default CreatePostForm;
