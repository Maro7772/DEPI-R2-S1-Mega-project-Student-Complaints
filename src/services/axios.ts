import axios from 'axios';

const axiosInstance = axios.create({
baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URI,
  withCredentials: true, // i am using cookie not local storage (there is no need to autherization header)
});

export default axiosInstance;