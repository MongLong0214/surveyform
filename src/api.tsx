import axios from "axios";

const BACKEND_PORT_NUMBER = "5000";
const serverUrl = `http://localhost:${BACKEND_PORT_NUMBER}/`;
axios.defaults.baseURL = serverUrl;

async function get(endpoint: string, params = "") {
    try {

        const response = await axios.get(endpoint + "/" + params);
        return response.data;
    } catch (error) {
        console.error(`GET 요청에 오류가 발생했습니다: ${error}`);
        throw error;
    }
}

async function del(endpoint: string, id: number) {
    return axios.delete(endpoint + "/" + id);
}

async function post(endpoint: string, data: any) {
    try {
        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`POST 요청에 오류가 발생했습니다: ${error}`);
        throw error;
    }
}

async function put(endpoint: string, id: number | string, data: any) {
    try {
        const response = await axios.put(endpoint + "/" + id, data);
        return response.data;
    } catch (error) {
        console.error(`PUT 요청에 오류가 발생했습니다: ${error}`);
        throw error;
    }
}

export { get, del, post, put };
