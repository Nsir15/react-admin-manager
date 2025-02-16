import React, { useEffect } from "react"

import { Layout, Watermark } from "antd"
import styles from "./index.module.scss"
import NavHeader from "@/components/NavHeader"
import SideMenu from "@/components/Menu"
import useStore from "@/store"
import NavFooter from "@/components/NavFooter"
import { Navigate, Outlet, useLocation, useRouteLoaderData } from "react-router-dom"
import { IAuthLoader } from "@/router/AuthLoader"
import { findRoute, wrapperRequest } from "@/utils"
import { routes } from "@/router"
import { getUserInfo } from "@/api"
import { useShallow } from "zustand/shallow"
import MultTabs from "@/components/MultTabs"

const { Sider } = Layout

const staticPath = ["/welcome", "/404", "/403"]
const App: React.FC = () => {
  const { collapsed, roles, nickName, updateUserInfo } = useStore(
    useShallow(state => {
      return {
        collapsed: state.collapsed,
        roles: state.userInfo.roles,
        nickName: state.userInfo.nickName,
        updateUserInfo: state.updateUserInfo
      }
    })
  )

  const { pathname } = useLocation()
  const authData = useRouteLoaderData<IAuthLoader>("layout")
  const { menuPathList } = authData || {}

  const currentRoute = findRoute(pathname, routes)

  if (currentRoute && currentRoute.meta?.auth === false) {
  } else if (!menuPathList?.includes(pathname) && !staticPath.includes(pathname)) {
    return <Navigate to={"/403"} />
  }

  const fetchUserInfo = async () => {
    const [error, data] = await wrapperRequest(getUserInfo())
    if (data) {
      updateUserInfo(data)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <Watermark content={nickName} className='watermark'>
      <Layout className={styles.layoutWrapper}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <NavHeader />
          <MultTabs />
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <div className={styles.contentBody}>
                <Outlet></Outlet>
              </div>
            </div>
            <NavFooter />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
