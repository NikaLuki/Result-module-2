import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };
const usersSlice = createSlice({
    name: "users",
    initialState,

    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSucces: (state, action) => {
            const elementIndex = state.entities.findIndex(
                (u) => u._id === action.payload._id
            );
            state.entities[elementIndex] = action.payload;
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersReceved,
    usersRequestFailed,
    usersRequested,
    authRequestFailed,
    authRequestSuccess,
    userCreated,
    userLoggedOut,
    userUpdateSucces,
    userUpdateFailed
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdated = createAction("users/userUpdated");

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userUpdated());
    try {
        const { content } = await userService.create(payload);
        dispatch(userUpdateSucces(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMesage = generateAuthError(message);
                dispatch(authRequestFailed(errorMesage));
            } else dispatch(authRequestFailed(error.message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());

        try {
            const data = await authService.register({ email, password });
            console.log(data);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    image: ` https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    rate: "5",
                    completedMeetings: "0",
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    history.push("/");
    dispatch(userLoggedOut());
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsers = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === userId);
    }
};
export const getUserLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
