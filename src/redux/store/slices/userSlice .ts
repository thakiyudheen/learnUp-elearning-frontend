import { SignupFormData } from '../../../types/ISignupData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupAction } from '../actions/auth/signupAction';
import { getUserDataAction } from '../actions/auth/getUserDataAction';
import { logoutAction } from '../actions/auth/logoutAction';
import { loginUserAction } from '../actions/auth/loginUserAction';
import { updateUserAction } from '../actions/user/updateUserAction';

export interface UserState {
    loading: boolean;
    data: any | null;
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
        
        // handle logout ---------------------------------------------
        .addCase(logoutAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutAction.fulfilled , (state : UserState , action ) =>{
            state.loading = false;
            state.data = null;
            state.error = null;
        })
        .addCase(logoutAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'get user failed';
        })

        // login data handle -----------------------------------------
        
        .addCase(loginUserAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUserAction.fulfilled , (state : UserState , action : PayloadAction<SignupFormData>) =>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(loginUserAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'Login failed';
        })

        // // update data handle -----------------------------------------
        
        // .addCase(updateUserAction.pending , (state : UserState) =>{
        //     console.log('update user is working')
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(updateUserAction.fulfilled , (state : UserState , action : PayloadAction<SignupFormData>) =>{
        //     state.loading = false;
        //     state.data = action.payload;
        //     state.error = null;
        // })
        // .addCase(updateUserAction.rejected,(state : UserState , action ) =>{
        //     state.loading = true ; 
        //     state.data =null ;
        //     state.error = action.error.message || 'updation failed';
        // })

    },
});

export const { storeUserData, tempSignupData } = userSlice.actions;

export const userReducer = userSlice.reducer;
