import { api_client } from "../../../../axios";
import { config } from "../../../../common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
interface data {
    email : string ;
    otp : string
  }

export const verifyOtpAction = createAsyncThunk( 
    'user/verify-otp',
    async ( data : data ,{ rejectWithValue }) => {
        try {

            const response = await api_client.post('/api/auth/verify-otp',
            data,
            config
            )
            console.log('this is login response otp', response.data)
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