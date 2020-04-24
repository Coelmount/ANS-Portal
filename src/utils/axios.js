import axios from 'axios'
import AuthStore from 'stores/Auth'

export const BASE_URL = 'https://yaoh1.bxl.netaxis.be/api/v01'
export const PROXY_P6 = '/p6'

const instance = axios.create({
  baseURL: `${BASE_URL}${PROXY_P6}`,
  headers: { Authorization: `Bearer *token*` }
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      AuthStore.logOut()
    }
    return Promise.reject(error)
  }
)

export default instance
