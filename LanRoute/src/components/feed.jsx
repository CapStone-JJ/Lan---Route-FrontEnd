import React, { useState, useEffect } from 'react';
import {
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useGetVotesQuery,
    useAddVoteMutation,
    useDeleteVoteMutation, 
    useGetPostsQuery,
    useAddPostMutation,
    useGetTagsQuery
} from "../api/lanRouteAPi";

export default function feed() {
    const { data: comments, isLoading: commentsLoading, isEror: commentsError } = useGetCommentsQuery();
    const [addComment] = useAddCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const { data: votes, isLoading: votesLoading, isError: votesError } = useGetVotesQuery();
    const [addVote] = useAddVoteMutation();
    const [deleteVote] = useDeleteVoteMutation();
    const { data: posts, isLoading: postsLoading, isError: postsError } = useGetPostsQuery();
    const [addPost] = useAddPostMutation();
    const { data: tags, isLoading: tagsLoading, isError: tagsError } = useGetTagsQuery();

// State for new comment input
const [newCommentText, setNewCommentText] = useState("");

// Function to handle adding a new comment
const HandleAddComment = async() => {
    try {
        await addComment({ text: newCommentText});
        setNewCommentText("");
    } catch (error) {
        console.error("Error adding comment:", error)
    }
}

// Function to handle deleting a comment
const HandleDeleteComment = async(commentId) => {
    try {
        await deleteComment({ id: commentId});
    } catch (error) {
        console.error("Error deleting Comment", error);
    }
};

// Function to handle adding a vote 
const HandleAddVote = async(postId) => {
    try {
        await addVote({ postId: postId });
    } catch (error) {
        console.error("Error deleting vote:", error);
    }
};

// Function to handle deleting a vote
const HandleDeleteVote = async(voteId) => {
    try {
        await deleteVote({id: voteId});
    } catch (error) {
        console.error("Error deleting vote:", error);
    }
};

}

