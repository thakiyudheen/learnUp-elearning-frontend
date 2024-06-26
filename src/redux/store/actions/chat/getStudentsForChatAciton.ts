import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";


export const getStudentsForChatAction = createAsyncThunk(
    'user/get-students',
    async ( data :{instructorId:string}, { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${course}get-studentForChat`,{params:data})

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