import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllStudentAction = createAsyncThunk(
    'user/getAll-students',
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`/api/user/getAll-students`,

                {
                    withCredentials : true
                }
            )

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