import axios from 'axios'
import get from 'lodash/get'
import AuthStore from 'stores/Auth'

export const BASE_URL = 'https://yaoh1.bxl.netaxis.be/api/v01'
export const PROXY_P6 = '/p6'

const tokenExpMsg = 'Invalid authorization token'

const instance = axios.create({
  baseURL: `${BASE_URL}${PROXY_P6}`,
  headers: { Authorization: `Bearer *token*` }
})

instance.interceptors.request.use(
  config => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const status = get(error, 'response.status', null)
    const errorMessage = get(error, 'response.statusText', '')
    const config = get(error, 'config', {})

    if (
      status === 401 &&
      config.url === `${config.baseURL}/auth/access_token`
    ) {
      return Promise.reject(error)
    } else if (status === 401 && errorMessage === tokenExpMsg) {
      const refreshJwtToken = localStorage.getItem('refreshJwtToken')

      try {
        const res = await axios.get(`${BASE_URL}/auth/access_token`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${refreshJwtToken}`
          }
        })
        if (res.status === 200 && res.data) {
          const newJwtToken = res.data.access_token
          localStorage.setItem('jwtToken', newJwtToken)
          config.headers['Authorization'] = `Bearer ${newJwtToken}`
        } else {
          AuthStore.logOut()
        }
        return axios(config).catch(() => {
          AuthStore.logOut()
        })
      } catch (e) {
        AuthStore.logOut()
      }
    }
    return Promise.reject(error)
  }
)

export default instance
