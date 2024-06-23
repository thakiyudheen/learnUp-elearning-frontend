import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { payment } from "../../../../common/endPoint";

interface data {
    courseName: string;
    courseThumbnail: string;
    courseId: string;
    amount: number | string;
    userId: string;
}

export const createSessionAction = createAsyncThunk(
    'user/create-session',
    async (data: data , { rejectWithValue }) => {
        try {
            const response = await api_client.post(`${payment}create-session`,data,config)

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