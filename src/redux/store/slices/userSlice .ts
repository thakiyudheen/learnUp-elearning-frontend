import { SignupFormData } from '../../../types/ISignupData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupAction } from '../actions/auth/signupAction';
import { getUserDataAction } from '../actions/auth/getUserDataAction';

export interface UserState {
    loading: boolean;
    data: SignupFormData | null;
    error: string | null;
    temp: SignupFormData | null;
}

const initialState: UserState = {
    loading: false,
    data: null,
    error: null,
    temp: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        tempSignupData: (state: UserState, action: PayloadAction<any>) => {

            state.temp = action.payload;
        },
        storeUserData: (state: UserState, action: PayloadAction<any>) => {
            
            state.data = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        
        // signup actin ---------------------------------------

        .addCase(signupAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(signupAction.fulfilled , (state : UserState , action : PayloadAction<SignupFormData>) =>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(signupAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'signup failed';
        })

        // get user data Action ----------------------------------

        .addCase(getUserDataAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserDataAction.fulfilled , (state : UserState , action : PayloadAction<SignupFormData>) =>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(getUserDataAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'get user failed';
        })
    },
});

export const { storeUserData, tempSignupData } = userSlice.actions;

export const userReducer = userSlice.reducer;
