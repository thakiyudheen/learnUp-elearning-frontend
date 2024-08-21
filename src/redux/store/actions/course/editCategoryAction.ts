import { config } from "@/common/configuration";
import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "@/common/endPoint";

export const editCategoryAction = createAsyncThunk(
    'user/find-category',
    async (data:{ categoryName : string , isBlocked : boolean , _id : string} , { rejectWithValue }) => {
        try {
            console.log('edit category name reached')
            const response = await api_client.patch(`${course}update-category`,data,config )

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