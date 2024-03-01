import React, { useState } from 'react';
import {
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useGetVotesQuery,
    useAddVoteMutation,
    useDeleteVoteMutation,
} from "../api/comments";

import {
    useGetPostsQuery,
    useAddPostMutation,
} from "../api/posts";

import {
    useGetTagsQuery,
} from "../api/tags"

// Import statements...

export default function Feed() {
    // Hooks for API calls and state management
    const { data: commentsData, isLoading: commentsLoading, isError: commentsError } = useGetCommentsQuery();
    const { data: votesData, isLoading: votesLoading, isError: votesError } = useGetVotesQuery();
    const { data: postsData } = useGetPostsQuery();
    const { data: tags, isLoading: tagsLoading, isError: tagsError } = useGetTagsQuery();

    // State for new comment input
    const [newCommentText, setNewCommentText] = useState("");

    // Function to handle adding a new comment
    const HandleAddComment = async () => {
        try {
            await addComment({ text: newCommentText });
            setNewCommentText("");
        } catch (error) {
            console.error("Error adding comment:", error)
        }
    }

    // Function to handle deleting a comment
    const HandleDeleteComment = async (commentId) => {
        try {
            await deleteComment({ id: commentId });
        } catch (error) {
            console.error("Error deleting Comment", error);
        }
    };

    // Function to handle adding a vote 
    const HandleAddVote = async (postId) => {
        try {
            await addVote({ postId: postId });
        } catch (error) {
            console.error("Error adding vote:", error);
        }
    };

    // Function to handle deleting a vote
    const HandleDeleteVote = async (voteId) => {
        try {
            await deleteVote({ id: voteId });
        } catch (error) {
            console.error("Error deleting vote:", error);
        }
    };

    return (
        <div>
            {/* Render posts if data is available */}
            {postsData && postsData.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {/* Render comments */}
                    {commentsData
                        .filter((comment) => comment.postId === post.id)
                        .map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.text}</p>
                                <button onClick={() => HandleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        ))}
                    {/* Render voting */}
                    <button onClick={() => HandleAddVote(post.id)}>Upvote</button>
                    <button onClick={() => HandleDeleteVote(post.id)}>Downvote</button>
                    {/* Render tags */}
                    <ul>
                        {tags
                            .filter((tag) => tag.postId === post.id)
                            .map((tag) => (
                                <li key={tag.id}>{tag.name}</li>
                            ))}
                    </ul>
                    <hr />
                </div>
            ))}
            {/* Add new comment */}
            <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button onClick={HandleAddComment}>Add Comment</button>
        </div>
    );
};

