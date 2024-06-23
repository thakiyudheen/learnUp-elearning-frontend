import { api_client } from "../../../../axios";
import { config } from "../../../../common/configuration";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { auth } from "../../../../common/endPoint";
interface data {
    email : string ;
    password : string
  }

export const loginUserAction = createAsyncThunk( 
    'user/login-user',
    async ( data : data ,{ rejectWithValue }) => {
        try {

            const response = await api_client.post(`${auth}login`,
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