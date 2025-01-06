import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_url,
  withCredentials:true
});

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;