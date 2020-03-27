import axios from 'axios'

export const BASE_URL = 'https://196.30.50.142/api/v01'
// export const BASE_URL = 'https://yaoh1.bxl.netaxis.be/api/v01/custom/ans'

const PROXY = '/p1'

const instance = axios.create({
  baseURL: `${BASE_URL}${PROXY}`,
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

export default instance
