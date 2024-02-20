import { useContext } from 'react';
import axiosInstance from '../utils/axios';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
const useApi = () => {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const apiCall = async ({ url, method, data = null }) => {
        try {
            setLoading(true)
            const response = await axiosInstance({
                url,
                method,
                data
            });
            setLoading(false)
            return response.data;
        } catch (error) {
            setError(true)
            setLoading(false)
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
        finally{
            setLoading(false)
        }
    };

    return { apiCall, error, loading };
};

export default useApi;