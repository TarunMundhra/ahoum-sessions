import axios from 'axios';

// We point this directly to your Nginx proxy URL
const BASE_URL = 'http://localhost:8000/api/';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // THIS IS THE MAGIC LINE: It tells the browser to send your secure JWT cookies 
    // with every single request to the backend.
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
     
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Optional but highly recommended: Add an interceptor to catch 401 Unauthorized errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Authentication required. Redirecting to login...");
            // You can add logic here later to clear the user's local state 
            // or redirect them to the home page if their token expires.
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;