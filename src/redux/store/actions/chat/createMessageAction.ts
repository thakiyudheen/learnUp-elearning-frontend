import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { chat } from "../../../../common/endPoint";
import { config } from "@/common/configuration";

export const createMessageAction = createAsyncThunk(
    'user/create-message',
    async ( data :any, { rejectWithValue }) => {
        console.log('this  is reched');
        
        try {
            const response = await api_client.post(`${chat}create-message`,data,config)

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