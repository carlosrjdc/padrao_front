import axios from "axios";
import qs from "querystring";


export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_AXIOS,
    headers: {
        'Content-Type': 'application/json',
    },
    });

    export const axiosRefresh = async (refreshToken:string)=> {

        const data = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }
        const formData = qs.stringify(data);
        const accessToken = await  axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_REFRESH_TOKEN}`,formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
        return accessToken.data;

}

    export const axiosAuth = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL_AXIOS,
        headers: {
            'Content-Type': 'application/json',

        },
    });