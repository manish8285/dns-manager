import axios from 'axios';
import { getToken } from '../services/auth';
const VITE_API_URI= import.meta.env.VITE_API_URI



export const myAxios = axios.create({
  baseURL: VITE_API_URI,
});

myAxios.interceptors.request.use((config) =>
{
  const token = getToken()
  console.log(token)
  if(token)
  config.headers = {...config.headers,Authorization:`Bearer ${token}`};
  return config;
});
