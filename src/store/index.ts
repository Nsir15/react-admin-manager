import { create } from "zustand"
import { User } from "@/types/api"

const useStore = create<{
  userInfo: User.UserInfo
  updateUserInfo: (userInfo: User.UserInfo) => void
}>(set => ({
  userInfo: {} as User.UserInfo,
  updateUserInfo: (userInfo: User.UserInfo) => set({ userInfo })
}))

export default useStore
