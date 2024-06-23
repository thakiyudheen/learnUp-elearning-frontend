import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { auth } from "../../../../common/endPoint";

export const forgetPasswordAction = createAsyncThunk(
    'user/forget-password',
    async (email : string , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${auth}forget-password/${email}`,
 
                {
                    withCredentials : true
                }
            )

            if(response.data.success){

                return response.data

            } else {

				return rejectWithValue(response.data);

			}




        } catch ( error : any ) {
            const e : any = error as AxiosError ;

            throw new Error(

				e.response?.data.error || e.response?.data.message || e.message

			)
        }
    }
)