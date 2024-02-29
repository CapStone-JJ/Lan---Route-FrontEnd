import {createSlice} from "@reduxjs/toolkit";
import tagApi from "../api/tags";

const tagSlice = createSlice({
    name: "tag",
    initialState: {
        tags: [],
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(tagApi.endpoints.getTags.matchFulfilled, (state, { payload }) => {
            state.tags = payload; 
          })
          .addMatcher(tagApi.endpoints.getTag.matchFulfilled, (state, { payload }) => {
            state.tags = payload; 
          })
          .addMatcher(tagApi.endpoints.addTag.matchFulfilled, (state, { payload }) => {
            state.tags.push(payload);
          })
          .addMatcher(tagApi.endpoints.deleteTag.matchFulfilled, (state, { meta: { arg: tagId } }) => {
            state.tags = state.tags.filter(tag => tag.id !== tagId);
          })
      },
    });

export default tagSlice.reducer;