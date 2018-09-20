import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://mypocket-5025d.firebaseio.com/'
})

export default axiosInstance;