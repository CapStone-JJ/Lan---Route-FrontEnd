import { configureStore } from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

export const store = configureStore({
    reducer: {
        [lanRouteApi.reducerPath]: lanRouteApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(lanRouteApi.middleware),
});

export default store;