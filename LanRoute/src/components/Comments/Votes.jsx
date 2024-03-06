import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useAddVoteMutation,
  useDeleteVoteMutation,
  useGetVotesQuery,
} from "../../api/comments";

const Votes = ({ commentId }) => {
  const { data: votes, isLoading, refetch: refetchVotes } = useGetVotesQuery();
  const [userVote, setUserVote] = useState(null);
  const [addVote] = useAddVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();
  const userId = useSelector(state => state.user.credentials.user.id);


  // Determine if the user has already voted on this comment
  useEffect(() => {
    if (isLoading) return;
    // Find if the current user has voted on this comment
    const vote = votes?.find(vote => vote.commentId === commentId && vote.userId === userId);
    setUserVote(vote);
  }, [votes, commentId, userId, isLoading]);

  const handleVote = async () => {
    if (userVote) {
      // User has already voted, so remove the vote
      await deleteVote(userVote.id).unwrap().then(() => refetchVotes());
    } else {
      // User has not voted, so add a vote
      await addVote({ commentId, userId, type: "upvote" }).unwrap().then(() => refetchVotes());
    }
  };

  // Disable the vote button if the votes are still loading
  if (isLoading) return <p>Loading...</p>;

  const totalVotes = votes?.filter(vote => vote.commentId === commentId).length || 0;

  return (
    <div>
      <span>Votes: {totalVotes}</span>
      <button onClick={handleVote} disabled={isLoading}>
        {userVote ? "Remove Vote" : "Vote"}
      </button>
    </div>
  );
};

export default Votes;