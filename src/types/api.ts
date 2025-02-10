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
