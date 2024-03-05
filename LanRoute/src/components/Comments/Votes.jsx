import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddVoteMutation,
  useDeleteVoteMutation,
  useGetVotesQuery,
} from '../../api/comments';

const Votes = ({ commentId }) => {
  // RTK Query hooks for adding and deleting votes
  const [addVote] = useAddVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  // Fetching all votes to display them. You might want to adjust this to fetch only relevant votes or manage votes state differently for scalability.
  const { data: votes } = useGetVotesQuery();

  // Extract votes for this specific comment from the fetched votes
  const votesForThisComment = votes?.filter(vote => vote.commentId === commentId) || [];

  // Handling vote addition
  const handleAddVote = async () => {
    await addVote({ commentId }).unwrap(); // Assuming the body requires just the commentId. Adjust according to your API.
  };

  // Handling vote deletion
  // This simplistic approach assumes each user can only vote once per comment, and you have the vote ID.
  // In a real-world scenario, you would likely need to track user's votes more precisely.
  const handleDeleteVote = async (voteId) => {
    await deleteVote(voteId).unwrap();
  };

  return (
    <div>
      <p>Votes: {votesForThisComment.length}</p>
      <button onClick={handleAddVote}>Like</button>
      {/* This button assumes a user can identify and choose to delete their specific vote. In practice, you may need a more complex approach to identify which vote to remove. */}
      {votesForThisComment.map((vote) => (
        <button key={vote.id} onClick={() => handleDeleteVote(vote.id)}>Unlike</button>
      ))}
    </div>
  );
};

export default Votes;
