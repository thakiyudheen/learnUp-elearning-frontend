import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";
import { config } from "@/common/configuration";




export const updateAssessmentAction = createAsyncThunk(
    'user/get-all-assessment',
    async ( data : any , { rejectWithValue }) => {
        try {
            const response = await api_client.patch(`${course}update-assessments`,data,config)

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