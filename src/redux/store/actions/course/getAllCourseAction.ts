import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllCourseAction = createAsyncThunk(
    'user/get-all-course',
    async ( data: { instructorRef ?: string , isPublished?:boolean } , { rejectWithValue }) => {
        try {
            console.log('instructor data',data)
           if(data?.instructorRef){
            const response = await api_client.get(`/api/course/getAll-course?instructorRef=${data.instructorRef}`,config)

            if(response.data.success){

                return response.data.data

            } else {

				return rejectWithValue(response.data.data);

			}

           }else if(data?.isPublished){

            
            const response = await api_client.get(`/api/course/getAll-course?isPublished=${data.isPublished}`,config)

            if(response.data.success){

                return response.data.data

            } else {

				return rejectWithValue(response.data.data);

			}

           }else{

                 const response = await api_client.get(`/api/course/getAll-course`,config)

                if(response.data.success){

                    return response.data.data

                } else {

                    return rejectWithValue(response.data.data);

                }
           }
            



        } catch ( error : any ) {
            const e : any = error as AxiosError ;

            throw new Error(

				e.response?.data.error || e.response?.data.message || e.message

			)
        }
    }
)