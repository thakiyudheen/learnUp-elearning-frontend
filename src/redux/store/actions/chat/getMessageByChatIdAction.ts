import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { chat } from "../../../../common/endPoint";


export const getMessageByChatIdAction = createAsyncThunk(
    'user/get-message',
    async ( data :{chat:string}, { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${chat}get-messageByChatId`,{params:data})

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