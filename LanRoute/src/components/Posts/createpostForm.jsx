import React, { useState, useEffect } from 'react';
import { useGetTagsQuery, useAddTagMutation } from '../../api/tags';
import { useAddPostMutation, useGetPostsQuery } from '../../api/posts';
import { useDispatch, useSelector } from 'react-redux';
import AutocompleteInput from '../Inputs/autocompleteInput';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { data: tagsData, refetch: refetchTags } = useGetTagsQuery();
  const [createPost, { isLoading: createPostLoading }] = useAddPostMutation();
  const dispatch = useDispatch();
  const [addTag] = useAddTagMutation();
  const { refetch: refetchPosts } = useGetPostsQuery(); // Refetch posts query
  const userId = useSelector(state => state.user.credentials.user.userId);// Assuming you have a user state in Redux

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !selectedTags.includes(tagInput)) {
        try {
            console.log("Tag input value:", tagInput);

            addTag({ variables: { name: tagInput } })
                .then(({ data }) => {
                    console.log("Data received from server:", data); // Add this line for debugging
                    // Check if the mutation was successful and a tag was added
                    if (data && data.addTag) {
                        const addedTag = data.addTag;
                        console.log("Tag added successfully:", addedTag.name);
                        setSelectedTags([...selectedTags, addedTag.name]);
                        setTagInput('');
                        // Refetch tags after adding a new tag (optional)
                        refetchTags();
                    }
                })
                .catch(error => {
                    console.error('Failed to add tag:', error.message);
                    // Handle error
                });
        } catch (error) {
            console.error('Failed to add tag:', error.message);
            // Handle error
        }
    }
};




  
  

const handlePostSubmit = async () => {
  console.log('Submitting post...'); // Check if the function is being called

  if (content.trim() === '') {
    // Handle empty content
    console.error('Error: Post content is empty.');
    return;
  }

  try {
    const postData = {
      content,
      tags: selectedTags,
      userId,
      published: true,
      refetchPosts
    };

    console.log('Creating post data:', postData); // Check the postData object

    await createPost(postData);

    console.log('Post created successfully.'); // Check if createPost mutation is executed

    // Refetch both tags and posts data after successful post creation
    refetchTags();
    refetchPosts();
    // Clear form fields after successful post creation
    setContent('');
    setSelectedTags([]);
  } catch (error) {
    console.error('Error creating post:', error);
    // Handle error
  }
};


return (
  <div>
    <textarea
      placeholder="What's happening?"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <div>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange}
        placeholder="Type a tag..."
      />
      <button onClick={handleAddTag}>Add Tag</button>
    </div>
    <div>
      {selectedTags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
    </div>
    <button onClick={handlePostSubmit} disabled={createPostLoading}>Post</button>
  </div>
);
};

export default CreatePostForm;


