import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "@/common/endPoint";

interface data {
    _id : string ,
    isBlocked ?: boolean ,
    isPublished ?:boolean,
    isReject ?:boolean
  }
  

export const updateCourseAction = createAsyncThunk(
    'user/get-all-course',
    async ( data : data, { rejectWithValue }) => {
        try {
           
            const response = await api_client.patch(`${course}update-course`,data, config )
           
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