import { create } from "zustand"
import { User } from "@/types/api"

interface IStoreState {
  collapsed: boolean
  userInfo: User.UserInfo
  theme: "light" | "dark"
  updateUserInfo: (userInfo: User.UserInfo) => void
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
}

const useStore = create<IStoreState>(set => ({
  collapsed: false,
  userInfo: {} as User.UserInfo,
  theme: "light",
  updateUserInfo: (userInfo: User.UserInfo) => set({ userInfo }),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed })),
  updateTheme: (isDark: boolean) => set(() => ({ theme: isDark ? "dark" : "light" }))
}))

export default useStore
