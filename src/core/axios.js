import axios from 'axios';

export const Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URI
});

export const Canceler = axios.CancelToken.source();