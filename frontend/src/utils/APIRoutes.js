import axios from 'axios'
export const host = "https://mern-task-manager-backend.vercel.app"

const baseUrl = axios.create({
    baseURL: "https://mern-task-manager-backend.vercel.app",
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

export default baseUrl