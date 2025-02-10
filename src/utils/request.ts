import { hideLoading, showLoading } from "@/components/Loading"
import envConfig from "@/config"
import axios from "axios"
import Storage from "./storage"
import { message } from "@/utils/AntdGlobal"

console.log("config:", envConfig)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

const instance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: envConfig.baseApi,
  timeout: 3000,
  timeoutErrorMessage: "请求超时，请待会儿再试"
  // withCredentials: true
})

instance.interceptors.request.use(
  config => {
    if (config.showLoading) {
      // 是否展示全局的loading效果
      showLoading()
    }
    const token = Storage.get("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (envConfig.mock === true) {
      config.baseURL = envConfig.mockApi
    } else {
      config.baseURL = envConfig.baseApi
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const data: IResponse = response.data
    hideLoading()
    return data.data
  },
  error => {
    hideLoading()
    // axios 对于 400 多、500 多的请求，都会抛出错误。
    let errorMessage = error.message || "请求失败，请稍后重试"

    if (error.response) {
      // 目前在会议预定系统中的 nest 服务中，对于错误的请求，错误信息会放在 message 里。
      const data: IResponse = error.response.data
      errorMessage = data.message
    } else if (error.request) {
      // 没有 response，但是有 request，说明请求发出去了，服务器没有响应
      errorMessage = "服务器无响应"
    }

    message.error(errorMessage)
    return Promise.reject({
      code: error.status,
      message: errorMessage,
      data: null
    })
    // return error.response
  }
)

const get = <T>(
  url: string,
  params: Record<string, any>,
  options: IConfig = { showLoading: true, showError: false }
): Promise<T> => {
  return instance.get(url, { params, ...options })
}
const post = <T>(
  url: string,
  params: Record<string, any>,
  options: IConfig = { showLoading: true, showError: false }
): Promise<T> => {
  return instance.post(url, params, { ...options })
}

export default {
  get,
  post
}
