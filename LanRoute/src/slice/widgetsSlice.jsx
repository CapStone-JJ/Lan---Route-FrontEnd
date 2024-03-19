import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import widgetApi from "../api/widgets";


export const convertPlaylist = createAsyncThunk(
  'widget/convertPlaylist',
  async (playlistUrl, thunkAPI) => {
    try {
      // Make the API call to convert the playlist
      const response = await widgetApi.convert(playlistUrl);
      // Assuming the API returns the embed code directly
      return response.data.embedCode;
    } catch (error) {
      // Handle any errors
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

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
          .addMatcher(widgetApi.endpoints.getSpecificWidget.matchFulfilled, (state, { payload }) => {
            state.specificWidget = payload;
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
          .addMatcher(convertPlaylist.fulfilled, (state, {payload}) => {
            state.embedCode = payload;
          })
      },
    });

export default widgetSlice.reducer;