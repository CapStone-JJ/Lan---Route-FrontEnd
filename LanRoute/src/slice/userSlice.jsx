import {createSlice} from "@reduxjs/toolkit";
import { lanRouteApi } from "../api/lanRouteAPi";

//session storage key
const CREDENTIALS = "credentials";

function storeToken(state, { payload }) {
    console.log("Payload received in storeToken:", payload);
    state.credentials = {
        token: payload.token,
        user: { ...payload.user, userId: payload.user.id } // Assign user ID from payload
    };
    window.sessionStorage.setItem(
        CREDENTIALS,
        JSON.stringify({
            token: payload.token,
            user: { ...payload.user, userId: payload.user.id } // Store user ID in session storage
        })
    );
}

const userSlice = createSlice({
    name: "user",
    initialState: {
      credentials: JSON.parse(
        window.sessionStorage.getItem(CREDENTIALS) || '{"token":"","user":{"userId":null,"admin":false,"image":null}}'
      ),
      results: {
        search: false,
        rslt: [],
      },
      friends: [],
    },
    reducers:{
        clearUserSearch : (state) => {
            return {
                ...state,
                results: {
                    search: false,
                    rslt: []
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(lanRouteApi.endpoints.login.matchFulfilled, storeToken);
        builder.addMatcher(lanRouteApi.endpoints.register.matchFulfilled, storeToken);
        builder.addMatcher(lanRouteApi.endpoints.editUser.matchFulfilled, (state, {payload}) => {
            state.credentials = {
                ...state.credentials,
                user: payload
            }
        });
        builder.addMatcher(lanRouteApi.endpoints.deleteUser.matchFulfilled, (state) => {
            state.credentials = {
                token: "",
                user: {userId:null, admin:false, image:null}
            };
            window.sessionStorage.removeItem(CREDENTIALS)
        })
        builder.addMatcher(lanRouteApi.endpoints.logout.matchFulfilled, (state)=>{
            state.credentials = {
                token:"",
                user: {userId:null, admin:false, image:null}
            };
            window.sessionStorage.removeItem(CREDENTIALS)
        });
        builder.addMatcher(lanRouteApi.endpoints.searchName.matchFulfilled, (state, {payload}) => {
            return {
                ...state,
                results: {
                    search: true,
                    rslt: payload
                }
            }
        });
        builder.addMatcher(lanRouteApi.endpoints.getAllFriends.matchFulfilled, (state, {payload}) => {
            state.friends = payload;
        })
        builder.addMatcher(lanRouteApi.endpoints.getUserFriends.matchFulfilled, (state, {payload}) => {
            state.friends = payload;
        })
        builder.addMatcher(lanRouteApi.endpoints.addFriend.matchFulfilled, (state, {payload}) => {
            state.friends = payload;
        })
        builder.addMatcher(lanRouteApi.endpoints.deleteFriend.matchFulfilled, (state, {payload}) => {
            state.friends = payload;
        });
    },
});

export default  userSlice.reducer;
export const {clearUserSearch} = userSlice.actions;