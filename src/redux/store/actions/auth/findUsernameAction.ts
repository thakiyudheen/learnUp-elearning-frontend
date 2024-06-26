import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { auth } from "../../../../common/endPoint";

export const findUsernameAction = createAsyncThunk(
    'user/find-userName',
    async (username : string , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${auth}exist_username/${username}`,

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