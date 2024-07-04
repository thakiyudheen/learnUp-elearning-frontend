import { api_client } from "../../../../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { course } from "../../../../common/endPoint";

const pdfConfig: any = {
    responseType: 'blob',
    headers: {
      'Accept': 'application/pdf'
    },
    withCredentials: true,
  };


export const downloadCertificateAction = createAsyncThunk(
    'user/download-certificate',
    async ( data : { name : string , courseName : string} , { rejectWithValue }) => {
        try {
            const response = await api_client.get(`${course}download-certificate`,{params:data})

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