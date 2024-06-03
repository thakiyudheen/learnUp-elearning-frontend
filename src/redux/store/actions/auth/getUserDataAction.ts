import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../../../common/configuration";
import { AxiosError } from "axios";

export const getUserDataAction = createAsyncThunk(
    'user/get-userData',
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`/api/auth/get-user/`, config )

            console.log('its get user response',response.data)

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