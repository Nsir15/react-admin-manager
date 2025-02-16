import React, { FC, memo, useEffect, useState } from "react"
import styles from "./index.module.scss"
import { Menu, MenuProps } from "antd"
import useStore from "@/store"
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom"
import { IAuthLoader } from "@/router/AuthLoader"
import { System } from "@/types/api"
import * as Icons from "@ant-design/icons"

type MenuItem = Required<MenuProps>["items"][number]

function createIcon(name?: string) {
  if (!name) return <></>
  const customerIcons: { [key: string]: any } = Icons
  const icon = customerIcons[name]
  if (!icon) return <></>
  return React.createElement(icon)
}

function formatMenu(menuList: System.IMenuItem[]): MenuItem[] {
  // menuState:1 有效， menuType:1 - 菜单 ， menuType:2 - 按钮 , item 有 buttons的话 说明当前是叶子节点了
  return menuList
    .filter((menu: System.IMenuItem) => menu.menuState === 1)
    .map((menu: System.IMenuItem, index: number) => {
      const item: MenuItem = {
        key: menu.path || index + "",
        label: menu.menuName,
        icon: createIcon(menu.icon),
        children: menu.menuType === 1 && !menu.buttons && menu.children ? formatMenu(menu.children) : undefined
      }
      return item
    })
}

interface IProps {}
const Component: FC<IProps> = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  const collapsed = useStore(state => state.collapsed)
  const data = useRouteLoaderData<IAuthLoader>("layout")
  const { menuList = [] } = data || {}
  const finalMenu = formatMenu(menuList)

  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location.pathname])

  const handleClickMenu = ({ key }: { key: string }) => {
    if (location.pathname === key) return
    setSelectedKeys([key])
    navigate(key)
  }

  return (
    <div className={styles.sideMenu}>
      <div className={styles.logo}>
        <img src='/public/img/logo.png' className={styles.logoImg} />
        {collapsed ? "" : <div className={styles.logoTitle}>后管系统</div>}
      </div>
      <Menu theme='dark' mode='inline' selectedKeys={selectedKeys} items={finalMenu} onClick={handleClickMenu} />
    </div>
  )
}

export default memo(Component)
