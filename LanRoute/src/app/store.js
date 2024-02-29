import { configureStore } from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";
import commentReducer from "../slice/commentsSlice";
import postReducer from "../slice/postsSlice";
import tagReducer from "../slice/tagsSlice";
import userReducer from "../slice/userSlice";
import widgetReducer from "../slice/widgetsSlice";


export const store = configureStore({
    reducer: {
        [lanRouteApi.reducerPath]: lanRouteApi.reducer,
        comment: commentReducer,
        post: postReducer,
        tag: tagReducer,
        user: userReducer,
        widget: widgetReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(lanRouteApi.middleware),
});

export default store;