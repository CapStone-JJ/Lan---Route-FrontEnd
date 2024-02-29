import {createSlice} from "@reduxjs/toolkit";
import widgetApi from "../api/widgets";

const widgetSlice = createSlice({
    name: "widget",
    initialState: {
        widgets: [],
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(widgetApi.endpoints.getWidgets.matchFulfilled, (state, { payload }) => {
            state.widgets = payload; 
          })
          .addMatcher(widgetApi.endpoints.editWidget.matchFulfilled, (state, { payload }) => {
            return {
                ...state,
                widgets: state.widgets.map(i => i.id === payload.id ? {...i, ...payload} : i)
            }
        }) 
          .addMatcher(widgetApi.endpoints.addWidget.matchFulfilled, (state, { payload }) => {
            state.widgets.push(payload);
          })
          .addMatcher(widgetApi.endpoints.deleteWidget.matchFulfilled, (state, { meta: { arg: widgetId } }) => {
            state.widgets = state.widgets.filter(widget => widget.id !== widgetId);
          })
      },
    });

export default widgetSlice.reducer;