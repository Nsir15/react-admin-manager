import React from "react"

import { Layout, Watermark } from "antd"
import styles from "./index.module.scss"
import NavHeader from "@/components/NavHeader"
import SideMenu from "@/components/Menu"
import useStore from "@/store"
import NavFooter from "@/components/NavFooter"
import { Outlet } from "react-router-dom"

const { Sider } = Layout

const App: React.FC = () => {
  const collapsed = useStore(state => state.collapsed)

  return (
    <Watermark content={"antd"} className='watermark'>
      <Layout className={styles.layoutWrapper}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <NavHeader />
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
