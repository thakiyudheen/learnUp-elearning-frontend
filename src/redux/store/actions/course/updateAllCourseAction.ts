import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "@/common/endPoint";


  

export const updateAllCourseAction = createAsyncThunk(
    'user/update-all-course',
    async ( data : any , { rejectWithValue }) => {
        try {
           
            const response = await api_client.put(`${course}update-all-course`,data, config )
           
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