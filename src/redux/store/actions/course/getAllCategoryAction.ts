import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "@/common/endPoint";

export const getAllCategoryAction = createAsyncThunk(
    'user/get-all-category',
    async ( data :{page?:number,limit?:number}, { rejectWithValue }) => {
        try {
           
            const response = await api_client.get(`${course}getAll-category`,{params:data})

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