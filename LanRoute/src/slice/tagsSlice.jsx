import {createSlice} from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

const tagSlice = createSlice({
    name: "tag",
    initialState: {
        tags: [],
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(lanRouteApi.endpoints.getTags.matchFulfilled, (state, { payload }) => {
            state.tags = payload; 
          })
          .addMatcher(lanRouteApi.endpoints.getTag.matchFulfilled, (state, { payload }) => {
            state.tags = payload; 
          })
          .addMatcher(lanRouteApi.endpoints.addTag.matchFulfilled, (state, { payload }) => {
            state.tags.push(payload);
          })
          .addMatcher(lanRouteApi.endpoints.deleteTag.matchFulfilled, (state, { meta: { arg: tagId } }) => {
            state.tags = state.tags.filter(tag => tag.id !== tagId);
          })
      },
    });

export default tagSlice.reducer;