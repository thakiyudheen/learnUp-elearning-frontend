import axios from 'axios'

const  BASE_URL = "http://localhost:3000"

export const api_client = axios.create({

    baseURL : BASE_URL

})