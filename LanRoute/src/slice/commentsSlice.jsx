import {createSlice} from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        votes: [],
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(lanRouteApi.endpoints.getComments.matchFulfilled, (state, { payload }) => {
            state.comments = payload; // Update comments array with fetched comments
          })
          .addMatcher(lanRouteApi.endpoints.addComment.matchFulfilled, (state, { payload }) => {
            state.comments.push(payload); // Add new comment to comments array
          })
          .addMatcher(lanRouteApi.endpoints.deleteComment.matchFulfilled, (state, { meta: { arg: commentId } }) => {
            state.comments = state.comments.filter(comment => comment.id !== commentId); // Remove deleted comment from comments array
          })
          .addMatcher(lanRouteApi.endpoints.getVotes.matchFulfilled, (state, { payload }) => {
            state.votes = payload; // Update votes array with fetched votes
          })
          .addMatcher(lanRouteApi.endpoints.addVote.matchFulfilled, (state, { payload }) => {
            state.votes.push(payload); // Add new vote to votes array
          })
          .addMatcher(lanRouteApi.endpoints.deleteVote.matchFulfilled, (state, { meta: { arg: voteId } }) => {
            state.votes = state.votes.filter(vote => vote.id !== voteId); // Remove deleted vote from votes array
          });
      },
    });

export default commentSlice.reducer;