import { Login, System } from "@/types/api"
import request from "@/utils/request"

export const loginRequest = (params: Login.LoginParams) => {
  return request.post<Login.LoginVo>("/user/login", params, { showLoading: false })
}

export const getPermissions = () => {}

export const getMenuList = (params: System.MenuSearchParams) => {
  return request.get<System.MenuItem[]>("/sys/menu/list", params)
}
