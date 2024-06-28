import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";


interface EnrollmentQueryParams {
    userId?: string;
    page: number;
    limit: number;
    search?: string | null;
    categories?: string[];
    levels?: string[];
    sort?: 'asc' | 'desc';
  }
export const getEnrollmentByIdAction = createAsyncThunk(
    'user/getEnrollment',
    async ( params : EnrollmentQueryParams , { rejectWithValue }) => {
        try {
         
            const response = await api_client.get(`${course}getEnrollment-ById`,{params:params})
            console.log('the respo',response)
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