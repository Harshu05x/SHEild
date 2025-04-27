import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:4001/api/v1", // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleError = (error) => {
    if (error.response && error.response.status === 404 && error?.response?.data?.forceLogout) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    } else {
        console.log(error);
    }
    throw error; // Ensure the function returns undefined in case of an error
};

export const getRequest = async (url, params, headers) => {
    try {
        const response = await axiosInstance.get(url, { params: { ...params }, headers: { ...headers } });
        console.log("GET Api --> ", response)
        return response;
    } catch (error) {
        console.log(`Error in GET request: at ${url}`, error);
        return handleError(error);
    }
};

export const postRequest = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        console.log("POST Api -->", response)
        return response;
    } catch (error) {
        console.log(`Error in POST request: at ${url}`, error);
        return handleError(error);
    }
};

export const putRequest = async (url, data) => {
    try {
        const response = await axiosInstance.put(url, data);
        console.log("PUT Api -->", response)
        return response;
    } catch (error) {
        console.log(`Error in PUT request: at ${url}`, error);
        return handleError(error);
    }
};

export const deleteRequest = async (url) => {
    try {
        const response = await axiosInstance.delete(url);
        console.log("DELETE Api -->", response)
        return response;
    } catch (error) {
        console.log(`Error in DELETE request: at ${url}`, error);
        return handleError(error);
    }
};

export const getRequestWithToken = async (url, params, headers) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(url, { params: { ...params }, headers: { ...headers, Authorization: `Bearer ${token}` } });
        console.log("GET Api -->", response)
        return response;
    } catch (error) {
        return handleError(error);
        }
}

export const postRequestWithToken = async (url, data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
        console.log("POST Api -->", response)
        return response;
    } catch (error) {
        console.log("POST Api -->", error)
        return handleError(error);
    }
}
