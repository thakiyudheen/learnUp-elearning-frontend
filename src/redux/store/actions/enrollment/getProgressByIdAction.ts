import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";


interface EnrollmentQueryParams {
    userId: string;
    courseId:string;
  }
export const getProgressByIdAction = createAsyncThunk(
    'user/getProgress',
    async ( params : EnrollmentQueryParams , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${course}getProgress-ById`,{params:params})

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