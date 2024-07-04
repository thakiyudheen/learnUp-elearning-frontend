import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";




export const deleteAssessmentAction = createAsyncThunk(
    'user/delete-assessment',
    async ( data : {_id : string , courseId : string} , { rejectWithValue }) => {
        try {
            const response = await api_client.delete(`${course}delete-assessments`,{params:data})

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