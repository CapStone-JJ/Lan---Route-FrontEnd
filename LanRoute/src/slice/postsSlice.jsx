import {createSlice} from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        likes: [],
        results: {
            search: false,
            rslt: []
        }
    },
    reducers:{
        clearSearch: (state) => {
            return {
                ...state,
                results: {
                    search: false,
                    rslt: []
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(lanRouteApi.endpoints.getPosts.matchFulfilled, (state, { payload }) => {
            state.posts = payload; // Update comments array with fetched comments
          })
          .addMatcher(lanRouteApi.endpoints.getPost.matchFulfilled, (state, { payload }) => {
            state.posts= payload; // Add new comment to comments array
          })
          .addMatcher(lanRouteApi.endpoints.searchPost.matchFulfilled, (state, {payload}) => {
            return {
                ...state,
                results: {
                    search: true,
                    rslt: payload
                }
            }
        })
          .addMatcher(lanRouteApi.endpoints.addPost.matchFulfilled, (state, { payload }) => {
            state.posts.push(payload); // Update posts array with fetched post
          })
          .addMatcher(lanRouteApi.endpoints.deletePost.matchFulfilled, (state, { meta: { arg: postId } }) => {
            state.posts = state.posts.filter((post) => post.id !== postId);
          })
          .addMatcher(lanRouteApi.endpoints.getLikes.matchFulfilled, (state, { payload }) => {
            state.likes = payload; // Update likes array with fetched likes
          })
          .addMatcher(lanRouteApi.endpoints.addLike.matchFulfilled, (state, { payload }) => {
            state.likes.push(payload); // Add new like to likes array
          })
          .addMatcher(lanRouteApi.endpoints.deleteLike.matchFulfilled, (state, { meta: { arg: likeId } }) => {
            state.likes = state.likes.filter((like) => like.id !== likeId);
          })
      },
    });

export default postSlice.reducer;
export const {clearSearch} = postSlice.actions;