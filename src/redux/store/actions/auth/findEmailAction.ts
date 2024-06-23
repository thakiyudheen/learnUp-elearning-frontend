import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../../axios";
import { AxiosError } from "axios";
import { auth } from "../../../../common/endPoint";


export const findEmailAction = createAsyncThunk (
    "user/find-Email",
    async (email: string , { rejectWithValue }) => {
        console.log('here  iam reached')

        try{
            
            const response = await api_client.get(`${auth}exist_email/${email}`,
                { withCredentials : true }
            )
            console.log('this is find mail respose', response.data)
            if( response.data.success ) {

                return response.data

            } else {
                return rejectWithValue( response.data )
            }

        }catch ( error : any ) {
            
            const e : any = error as AxiosError ;

            throw new Error(
                e.response?.data.error || e.response?.data.message || e.message
            )

        }
    }
)