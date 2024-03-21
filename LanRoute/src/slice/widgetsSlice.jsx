import { createSlice } from "@reduxjs/toolkit";
import widgetApi from "../api/widgets";

const widgetSlice = createSlice({
  name: "widget",
  initialState: {
    widgets: [],
    specificWidget: null,
    embeddedCode: null,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(widgetApi.endpoints.getWidgets.matchFulfilled, (state, { payload }) => {
        state.widgets = payload; 
      })
      .addMatcher(widgetApi.endpoints.getSpecificWidget.matchFulfilled, (state, { payload }) => {
        state.specificWidget = payload;
      })
      .addMatcher(widgetApi.endpoints.editWidget.matchFulfilled, (state, { payload }) => {
        state.widgets = state.widgets.map(item =>
          item.id === payload.id ? { ...item, ...payload } : item
        );
      }) 
      .addMatcher(widgetApi.endpoints.addWidget.matchFulfilled, (state, { payload }) => {
        state.widgets.push(payload);
      })
      .addMatcher(widgetApi.endpoints.deleteWidget.matchFulfilled, (state, { meta: { arg: widgetId } }) => {
        state.widgets = state.widgets.filter(widget => widget.id !== widgetId);
      })
      .addMatcher(widgetApi.endpoints.addPlaylist.matchFulfilled, (state, { payload }) => {
        state.widgets=payload
      })
      .addMatcher(widgetApi.endpoints.editPlaylist.matchFulfilled, (state, { payload }) => {
        state.widgets=payload
      })
      .addMatcher(widgetApi.endpoints.deletePlaylist.matchFulfilled, (state, { meta: { arg: playlistId } }) => {
        state.widgets = state.widgets.filter(widget => widget.id !== playlistId);
      })
      .addMatcher(widgetApi.endpoints.addToProfile.matchFulfilled, (state, { payload }) => {
        state.widgets=payload
      })
      .addMatcher(widgetApi.endpoints.getUserPlaylists.matchFulfilled, (state, { payload }) => {
        state.widgets = payload;
      })
      .addMatcher(widgetApi.endpoints.getSpecificPlaylist.matchFulfilled, (state, { payload }) => {
        state.specificWidget = payload;
      });
  },
});

export default widgetSlice.reducer;
