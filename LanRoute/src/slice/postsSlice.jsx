import {createSlice} from "@reduxjs/toolkit";
import postApi from "../api/posts";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        currentPost: null,
        likes: [],
        results: {
            search: false,
            rslt: []
        },
        feed: [],
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
          .addMatcher(postApi.endpoints.getPosts.matchFulfilled, (state, { payload }) => {
            state.posts = payload; // Update comments array with fetched comments
          })
          .addMatcher(postApi.endpoints.getPost.matchFulfilled, (state, { payload }) => {
            state.currentPost= payload; // Add new comment to comments array
          })
          .addMatcher(postApi.endpoints.searchPost.matchFulfilled, (state, {payload}) => {
            return {
                ...state,
                results: {
                    search: true,
                    rslt: payload
                }
            }
        })
          .addMatcher(postApi.endpoints.addPost.matchFulfilled, (state, { payload }) => {
            state.posts.push(payload); // Update posts array with fetched post
          })
          .addMatcher(postApi.endpoints.editPost.matchFulfilled, (state, {payload}) => {
            return {
                ...state,
                posts: state.posts.map(i => i.id === payload.id ? {...i, ...payload} : i)
            }
        })
          .addMatcher(postApi.endpoints.deletePost.matchFulfilled, (state, { meta: { arg: postId } }) => {
            state.posts = state.posts.filter((post) => post.id !== postId);
          })
          .addMatcher(postApi.endpoints.getLikes.matchFulfilled, (state, { payload }) => {
            state.likes = payload; // Update likes array with fetched likes
          })
          .addMatcher(postApi.endpoints.addLike.matchFulfilled, (state, { payload }) => {
            state.likes.push(payload); // Add new like to likes array
          })
          .addMatcher(postApi.endpoints.deleteLike.matchFulfilled, (state, { meta: { arg: likeId } }) => {
            state.likes = state.likes.filter((like) => like.id !== likeId);
          })
          .addMatcher(postApi.endpoints.getFeed.matchFulfilled, (state, { payload }) => {
            state.feed = payload; // Update likes array with fetched feed
          })
      },
    });

export default postSlice.reducer;
export const {clearPostSearch} = postSlice.actions;