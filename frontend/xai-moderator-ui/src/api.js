import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function get_inference(text){
const res  = await axios.post(`${BASE_URL}/analyze`,{text:text});
return res.data;
}