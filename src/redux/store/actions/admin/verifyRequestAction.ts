import { config } from "../../../../common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { user } from "@/common/endPoint";


interface data {
    email : string ,
    isVerified : boolean
}
export const verifyRequestAction = createAsyncThunk(
    'user/verify-request',
    async ( data : data , { rejectWithValue }) => {
        try {
            const response = await api_client.patch(`${user}verify-request`,data,config)

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