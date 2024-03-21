import { useState } from "react";
import { useGetTagsQuery, useAddTagMutation } from "../../api/tags";
import { useAddPostMutation, useGetPostsQuery } from "../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/createPost.css";

const CreatePostForm = () => {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState(null);
  const { data: tagsData, refetch: refetchTags } = useGetTagsQuery();
  const [createPost, { isLoading: createPostLoading }] = useAddPostMutation();
  const dispatch = useDispatch();
  const [addTag] = useAddTagMutation();
  const { refetch: refetchPosts } = useGetPostsQuery(); // Refetch posts query
  const userId = useSelector((state) => state.user.credentials.user.userId); // Assuming you have a user state in Redux

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Only taking the first file
  };

  const handleTagInputChange = (event) => {
    const inputValue = event.target.value;

    // Add "#" before each word
    let formattedInputValue = inputValue.trim().split(/\s+/).join(" #");

    // Add "#" after each comma if there's a word after it
    formattedInputValue = formattedInputValue.replace(/,(?=\S)/g, ", #");

    // Remove consecutive "#" symbols
    formattedInputValue = formattedInputValue.replace(/#+/g, "#");

    // Add "#" at the beginning if the input is not empty
    if (
      formattedInputValue.length > 0 &&
      !formattedInputValue.startsWith("#")
    ) {
      formattedInputValue = `#${formattedInputValue}`;
    }

    setTagInput(formattedInputValue);

    // Regular expressions to detect hashtags and mentions
    const hashtagRegex = /#(\w+)/g;

    // Extract hashtags and mentions from input value
    const hashtags = formattedInputValue.match(hashtagRegex);

    console.log("Detected hashtags:", hashtags);

    // Update selectedTags state with detected hashtags and mentions
    setSelectedTags([...(hashtags || [])]);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !selectedTags.includes(tagInput)) {
      try {
        addTag({ variables: { name: tagInput } })
          .then(({ data }) => {
            console.log("Data received from server:", data); // Add this line for debugging
            // Check if the mutation was successful and a tag was added
            if (data && data.addTag) {
              const addedTag = data.addTag;
              console.log("Tag added successfully:", addedTag.name);
              setSelectedTags([...selectedTags, addedTag.name]);
              setTagInput("");
              // Refetch tags after adding a new tag (optional)
              refetchTags();
            }
          })
          .catch((error) => {
            console.error("Failed to add tag:", error.message);
            // Handle error
          });
      } catch (error) {
        console.error("Failed to add tag:", error.message);
        // Handle error
      }
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting post..."); // Check if the function is being called

    if (content.trim() === "") {
      // Handle empty content
      console.error("Error: Post content is empty.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    selectedTags.forEach((tag) => formData.append("tags", tag)); // Assuming your backend can handle array of tags from FormData
    if (file) {
      formData.append("image", file); // For images. Use 'video' for video files
    }

    try {
      await createPost(formData).unwrap();

      console.log("Post created successfully."); // Check if createPost mutation is executed

      // Clear form fields after successful post creation
      setContent("");
      setFile(null);
      setSelectedTags([]);
      setTagInput("");
      // Optionally, refetch tags or posts here if necessary.
      refetchTags?.();
      refetchPosts?.();
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error
    }
  };

  return (
    <div className="create-post-form">
      <textarea
        className="post-content"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div>
        <input
          className="tag-input"
          type="text"
          value={tagInput}
          onChange={handleTagInputChange}
          placeholder="Type a tag..."
        />
      </div>
      {/* Input for uploading media files */}
      <input type="file" name="image" onChange={handleFileChange} />
      <button
        className="post-button"
        type="submit"
        onClick={handlePostSubmit}
        disabled={createPostLoading}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePostForm;
