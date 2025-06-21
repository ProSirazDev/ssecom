// src/utils/axiosInstance.js

import axios from 'axios';

const instance = axios.create({
  baseURL: __API_BASE_URL__, // '' in dev, full in prod
  withCredentials: true, // if using cookies/session
});

export default instance;
