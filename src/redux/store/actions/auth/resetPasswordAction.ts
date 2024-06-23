import { api_client } from "../../../../axios";
import { config } from "../../../../common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { auth } from "../../../../common/endPoint";
interface data {
    token : string | null;
    password : string,
  }

export const resetPasswordAction = createAsyncThunk( 
    'user/reset-password',
    async ( data : data ,{ rejectWithValue }) => {
        try {

            const response = await api_client.patch(`${auth}reset-password`,
            data,
            config
            )
            console.log('this is reset password response', response)
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