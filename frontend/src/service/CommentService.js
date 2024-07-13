import axios from 'axios';
import { axiosJWT } from './UserService';

export const createComment = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/comment/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const getDetailCommentProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/comment/get-comment/${id}`);
    return res.data;
};
export const getAllComment = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/comment/get-comment-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const deleteComment = async (id, data, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/comment/delete-comment/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
