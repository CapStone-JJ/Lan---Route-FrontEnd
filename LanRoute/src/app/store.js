import { configureStore } from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";
import commentSlice from "../slice/commentsSlice";
import postSlice from "../slice/postsSlice";
import tagSlice from "../slice/tagsSlice";
import userSlice from "../slice/userSlice";
import widgetSlice from "../slice/widgetsSlice";


export const store = configureStore({
    reducer: {
        [lanRouteApi.reducerPath]: lanRouteApi.reducer,
        comment: commentSlice,
        post: postSlice,
        tag: tagSlice,
        user: userSlice,
        widget: widgetSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(lanRouteApi.middleware),
});

export default store;