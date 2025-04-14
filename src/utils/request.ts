import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { useCookies } from '../composables/useCookies'
import { Auth } from '../api/types'

interface ResponseData<T> {
  code: number
  data: T
  message: string
}
export const baseURL = 'https://sdk.dorylus.chat/apis'
const service: AxiosInstance = axios.create({
  baseURL,
  timeout: 60000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { getCache } = useCookies()
    const auth = getCache('auth') as Auth
    config.headers['Token'] = auth?.token || ''
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    return res
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export function get<T = any>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return service.get(url, { params, ...config })
}

export function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return service.post(url, data, { ...config })
}

export default service
