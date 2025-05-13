import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // i am using cookie not local storage (there is no need to autherization header)
});

export default axiosInstance;