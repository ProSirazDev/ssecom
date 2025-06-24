const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Vite syntax
  withCredentials: true,
});

export default instance;
