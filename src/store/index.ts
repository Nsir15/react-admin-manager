import { create } from "zustand"
import { User } from "@/types/api"

interface IStoreState {
  collapsed: boolean
  userInfo: User.UserInfo
  updateUserInfo: (userInfo: User.UserInfo) => void
  updateCollapsed: () => void
}

const useStore = create<IStoreState>(set => ({
  collapsed: false,
  userInfo: {} as User.UserInfo,
  updateUserInfo: (userInfo: User.UserInfo) => set({ userInfo }),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))

export default useStore
