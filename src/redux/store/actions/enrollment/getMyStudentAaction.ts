import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";


interface EnrollmentQueryParams {
    userId?: string;
    page: number;
    limit?: number;
    instructorId ?:string;
  }
export const getMyStudentAction = createAsyncThunk(
    'user/getmyStudent',
    async ( params : EnrollmentQueryParams , { rejectWithValue }) => {
        
        console.log('params',params);
        try {
         
            const response = await api_client.get(`${course}get-myStudent`,{params:params})
            
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