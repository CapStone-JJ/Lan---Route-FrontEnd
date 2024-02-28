import {createSlice} from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

const widgetSlice = createSlice({
    name: "widget",
    initialState: {
        widgets: [],
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(lanRouteApi.endpoints.getWidgets.matchFulfilled, (state, { payload }) => {
            state.widgets = payload; 
          })
          .addMatcher(lanRouteApi.endpoints.editWidget.matchFulfilled, (state, { payload }) => {
            return {
                ...state,
                widgets: state.widgets.map(i => i.id === payload.id ? {...i, ...payload} : i)
            }
        }) 
          .addMatcher(lanRouteApi.endpoints.addWidget.matchFulfilled, (state, { payload }) => {
            state.widgets.push(payload);
          })
          .addMatcher(lanRouteApi.endpoints.deleteWidget.matchFulfilled, (state, { meta: { arg: widgetId } }) => {
            state.widgets = state.widgets.filter(widget => widget.id !== widgetId);
          })
      },
    });

export default widgetSlice.reducer;