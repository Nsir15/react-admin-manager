import { Login, ResultData, System } from "@/types/api"
import request from "@/utils/request"

export const loginRequest = (params: Login.LoginParams) => {
  return request.post<Login.LoginVo>("/user/login", params, { showLoading: false })
}

export const getPermissions = () => {}

export const getMenuList = (params: System.MenuSearchParams) => {
  return request.get<ResultData<System.IMenuItem>>("/sys/menu/list", params)
}

export const getPermissionList = () => {
  return request.get<{ buttonList: string[]; menuList: System.IMenuItem[] }>("/users/getPermissionList", {})
}
