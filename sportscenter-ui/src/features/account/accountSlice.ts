import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { AxiosError } from "axios";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";

interface AccountState {
    user: User | null;
    error: string | null;
}

const initialState: AccountState = {
    user: null,
    error: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'auth/login',
    async (data, thunkApi) => {
        try {
            const user = await agent.AccountApi.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                return thunkApi.rejectWithValue({error: message})
            }
            throw error;
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User | null>(
    'auth/fetchCurrentUser',
    async (_, thunkApi) => {
        try {
            // Retrieve user data from local storage
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData) as User;
                return user;
            }
            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                return thunkApi.rejectWithValue({error: message})
            }
            throw error;
        }
    }
);
    
export const logoutUser = createAsyncThunk<void>(
    'auth/logout',
    async (_, thunkApi) => {
        try {
            // Remove user from local storage
            localStorage.removeItem('user');
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                return thunkApi.rejectWithValue({error: message})
            }
            throw error;
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
            router.navigate('/');
        }, 
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
            state.error = null;
            toast.success('Sign in successful');
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected, logoutUser.fulfilled), (state, action) => {
            const payload = action.payload as string | null;
            state.error = payload;
            toast.error('Sign in failed. Please try again');
        })
    })
})

export const {logOut, clearError} = accountSlice.actions;
