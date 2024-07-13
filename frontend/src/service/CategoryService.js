import axios from 'axios';
import { axiosJWT } from './UserService';

export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/create`, data);
    return res.data;
};
export const getAllCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/getall`);
    return res.data;
};
export const deleteCategory = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/category/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
