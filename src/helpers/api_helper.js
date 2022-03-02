import axios from "axios"
import { getIdToken, signOut } from "../AuthService"
import moment from "moment"

//apply base url for axios
// TODO dummy api endpoint
const API_URL = "https://6073f3f2066e7e0017e78a3d.mockapi.io/api/v1/"

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
  error => {
    console.log('err::11', error?.response?.status)
  }
)

export { axiosApi }

const realAxiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  headers: {
    'content-type': 'application/json',
  },
})
realAxiosApi.interceptors.request.use(
  async (config) => {
    const userSession = sessionStorage.getItem("authUser");   
    if (!userSession) {
      //TODO: redirect user to login page
      signOut();      
      return;
    } 
    const userInfo = JSON.parse(userSession);
    config.headers = {
      Authorization: await getIdToken(userInfo),
    }
    return config
  },
  error => Promise.reject(error)
)

realAxiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export { realAxiosApi }

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