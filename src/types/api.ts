/**
 * 接口类型定义
 */

export namespace Login {
  export interface LoginParams {
    username: string
    password: string
  }

  export interface LoginVo {
    userInfo: User.UserInfo
    accessToken: string
    refreshToken: string
  }
}

export namespace User {
  export interface UserInfo {
    id: number
    username: string
    nickName: string
    headPic: string
    email: string
    phoneNumber: string
    isFrozen: boolean
    isAdmin: boolean
    roles: string[]
    permissions: Record<string, any>[]
    createTime: Date
    updateTime: Date
  }
}

export namespace System {
  export interface MenuSearchParams {
    menuName?: string
    menuState?: number
  }

  export interface CreateMenuParams {
    menuName: string // 菜单名称
    icon?: string // 菜单图标
    menuType: number // 1: 菜单 2：按钮 3：页面
    menuState: number // 1：正常 2：停用
    menuCode?: string // 按钮权限标识
    parentId?: string // 父级菜单ID
    path?: string // 菜单路径
    component?: string // 组件名称
  }

  export interface MenuItem extends CreateMenuParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
}

export interface TableResult<T> {
  total: number
  list: T[]
}
