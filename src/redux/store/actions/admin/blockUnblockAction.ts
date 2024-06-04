import { config } from "../../../../common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


interface data {
    _id : string ,
    isBlocked : boolean
}
export const blockUnblockAction = createAsyncThunk(
    'user/getAll-instrictors',
    async ( data : data , { rejectWithValue }) => {
        try {
            const response = await api_client.patch(`/api/user/block-unblock`,data,config)

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