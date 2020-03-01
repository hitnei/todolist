import axios from 'axios'

export const API_URL = 'http://localhost:5000';

var getToken = () => {
    let token = document.cookie.split(";").find(x => x.includes("authorization"));
    if (token && token.split("=")[1]) {
      token = token.split("=")[1]
      return token
    }
    return ""
}

export const CALLAPI = (method = 'post', path, data = {}, isHeader = true) => {
    var token = getToken()
    return axios({
        method: method,
        url: `${API_URL}/${path}`,
        data: data,
        headers: isHeader? { Authorization: `bearer ${token}` } : {}
    }).then(data => {
        return data
    })

};