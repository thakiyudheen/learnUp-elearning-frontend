import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getRequestAction = createAsyncThunk(
    'user/getAll-requests',
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`/api/user/getAll-requests`,

                {
                    withCredentials : true
                }
            )
            console.log('this is finded requests',response.data.data)

            
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