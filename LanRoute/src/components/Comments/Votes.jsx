import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useAddVoteMutation,
  useDeleteVoteMutation,
  useGetVotesQuery,
} from "../../api/comments";

const Votes = ({ commentId, userId }) => {
  const { data: votes, refetch: refetchVotes } = useGetVotesQuery();
  const [userVote, setUserVote] = useState(null);
  const [addVote] = useAddVoteMutation();
  const [deleteVote] = useDeleteVoteMutation();

  // Determine if the user has already voted on this comment
  useEffect(() => {
    const vote = votes?.find(
      (vote) => vote.commentId === commentId && vote.userId === userId
    );
    setUserVote(vote);
  }, [votes, commentId, userId]);

  const handleAddVote = async () => {
    try {
      await addVote({ commentId, userId, type: "upvote" }).unwrap();
      refetchVotes(); // Optionally use optimistic updates instead
    } catch (error) {
      console.error("Failed to add vote:", error);
    }
  };

  const handleDeleteVote = async () => {
    if (!userVote) return;
    try {
      await deleteVote(userVote.id).unwrap();
      refetchVotes(); // Optionally use optimistic updates instead
    } catch (error) {
      console.error("Failed to delete vote:", error);
    }
  };

  const totalVotes =
    votes?.filter((vote) => vote.commentId === commentId).length || 0;

  return (
    <div>
      <span>Votes: {totalVotes}</span>
      <button onClick={userVote ? handleDeleteVote : handleAddVote}>
        {userVote ? "Remove Vote" : "Vote"}
      </button>
    </div>
  );
};

export default Votes;
