import axios from "axios"
import queryString from "query-string"

const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('graphAccessToken')
    },
    paramsSerializer: params => queryString.stringify(params),
});

export function getUserProperties() {
    return axiosClient.get(`https://graph.microsoft.com/v1.0/me/?$select=displayName, mail`, { responseType: 'json' })
}

export function getUserImage(inputUPN) {
    return axiosClient.get(`https://graph.microsoft.com/beta/users/${inputUPN}/photo/$value`, { responseType: 'blob' })
}

