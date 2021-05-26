import axios from "axios"

//apply base url for axios
// TODO dummy api endpoint
// const API_URL = "https://6073f3f2066e7e0017e78a3d.mockapi.io/api/v1/"
const API_URL = "https://cp54ul6po2.execute-api.ap-southeast-1.amazonaws.com/dev"

export {API_URL};

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem('apiAccessToken')
  },
})

// ADTODO
axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export { axiosApi }

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
