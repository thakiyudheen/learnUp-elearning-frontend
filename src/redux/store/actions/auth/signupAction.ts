import { SignupFormData } from "../../../../types/ISignupData";
import { api_client } from "../../../../axios";
import { config } from "../../../../common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signupAction = createAsyncThunk( 
    'user/signup-user',
    async ( data : SignupFormData ,{ rejectWithValue }) => {
        try {

            const response = await api_client.post('${auth}signup',
            data,
            config
            )
            console.log('this is login response', response)
            if(response.data.success) {

                return response.data ;

            } else {
                return rejectWithValue(response.data)
            }




        } catch ( error : any ) {
            const e : any = error as AxiosError;

            throw new Error(
                e.response?.data.error || e.response?.data.message || e.message
            );
            
        }
    }
)