import { useContext } from 'react';
import axiosInstance from '../utils/axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useApi = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiCall = async ({ url, method, data = null }) => {
        try {
            const response = await axiosInstance({
                url,
                method,
                data
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error(error.response.data.message)
                    setUser(null); // Unauthorized: Token is invalid or expired
                    navigate('/')

                } else if (error.response.status === 403) {
                    toast.error("Forbidden Access")
                }
            }
            throw error; // rethrow the error for the calling component to handle
        }
    };

    return { apiCall };
};

export default useApi;