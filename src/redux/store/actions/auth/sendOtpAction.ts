import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";



export const sendOtpAction = createAsyncThunk(
    'user/send-otp',
    async ( email : string | undefined , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`/api/notification/email-verification/${email}`,

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