import { Login } from "@/types/api"
import request from "@/utils/request"

export const loginRequest = (params: Login.LoginParams) => {
  return request.post<Login.LoginVo>("/user/login", params, { showLoading: false })
}
