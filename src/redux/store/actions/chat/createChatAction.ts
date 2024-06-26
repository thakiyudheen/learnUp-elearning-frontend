import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { chat } from "../../../../common/endPoint";
import { config } from "@/common/configuration";

interface Data {
    participants: [string, string]; // Array of two strings: studentId and instructorId
  }

export const createChatAction = createAsyncThunk(
    'user/create-chat',
    async ( data :Data, { rejectWithValue }) => {
        try {
            const response = await api_client.post(`${chat}create-chat`,data,config)

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