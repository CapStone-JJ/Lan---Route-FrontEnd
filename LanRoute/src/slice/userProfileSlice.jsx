import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

const initialState = {
    userProfile: null,
    loading: false,
    error: null,
};

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (username, { rejectWithValue }) => {
      try {
        const response = await lanRouteApi.userProfile(username);
        return response.data; // Assuming the API response contains user profile data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
      clearUserProfile: (state) => {
        state.userProfile = null;
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userProfile = action.payload;
      });
      builder.addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });
  
  export const { clearUserProfile } = userProfileSlice.actions;
  export default userProfileSlice.reducer;