import React, { FC, memo } from "react"
import styles from "./index.module.scss"
import { Menu } from "antd"
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons"
import useStore from "@/store"

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props
  const collapsed = useStore(state => state.collapsed)

  return (
    <div className={styles.sideMenu}>
      <div className={styles.logo}>
        <img src='/public/img/logo.png' className={styles.logoImg} />
        {collapsed ? "" : <div className={styles.logoTitle}>后管系统</div>}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1"
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2"
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3"
          }
        ]}
      />
    </div>
  )
}

export default memo(Component)
