import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { payment } from "../../../../common/endPoint";


export const getAllPaymentAction = createAsyncThunk(
    'user/getAll-payment',
    async ( data : any , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${payment}getAll-payment`,{params:data})

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