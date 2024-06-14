import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllCourseAction = createAsyncThunk(
    'user/get-all-course',
    async (_ , { rejectWithValue }) => {
        try {
           
            const response = await api_client.get(`/api/course/getAll-course`,config)

            if(response.data.success){

                return response.data.data

            } else {

				return rejectWithValue(response.data.data);

			}




        } catch ( error : any ) {
            const e : any = error as AxiosError ;

            throw new Error(

				e.response?.data.error || e.response?.data.message || e.message

			)
        }
    }
)