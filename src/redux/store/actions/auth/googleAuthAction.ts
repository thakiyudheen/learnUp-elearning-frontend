import { IGoogleAuth } from "@/types/IgoogleAuth";
import { api_client } from "../../../../axios";
import { config } from "../../../../common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";



export const googleAuthAction = createAsyncThunk( 
    'user/google-auth',
    async ( credentials : IGoogleAuth ,{ rejectWithValue }) => {
        try {
            
            const response = await api_client.post('/api/auth/google-auth',
            credentials,
            config
            )
            console.log('this is google auth response', response)
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