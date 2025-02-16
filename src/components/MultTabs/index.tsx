import { Tabs, TabsProps } from "antd"
import { FC, memo, useEffect, useState } from "react"
import styles from "./index.module.scss"
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom"
import { findRoute } from "@/utils"
import { IAuthLoader } from "@/router/AuthLoader"

type ITabItems = TabsProps["items"]

interface IProps {}
const Component: FC<IProps> = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { menuList = [] } = useRouteLoaderData("layout") as IAuthLoader
  const [activeKey, setActiveKey] = useState("/welcome")
  const [items, setItems] = useState<ITabItems>([
    {
      label: "首页",
      key: "/welcome",
      closable: false
    }
  ])

  function addTabs() {
    const _items = items ? [...items] : []

    if (items?.findIndex(item => item.key === pathname) === -1) {
      const route = findRoute(pathname, menuList)
      if (route) {
        _items.push({
          label: route?.menuName,
          key: route?.path!
        })
      }
    }

    setItems([..._items])
    setActiveKey(pathname)
  }

  function handleTabEdit(targetKey: string) {
    const index = items?.findIndex(item => item.key === targetKey)
    // 如果删除的是最后一个，那 index+1 就是 Undefined，就取 前面一个
    const newActive = items![index! + 1] || items![index! - 1]
    setItems(items?.filter(item => item.key !== targetKey))
    setActiveKey(newActive.key)
    navigate(newActive.key)
  }
  function handleTabClick(key: string) {
    navigate(key)
  }

  useEffect(() => {
    addTabs()
  }, [pathname])

  return (
    <div className={styles.multTabs}>
      <Tabs
        type='editable-card'
        tabBarStyle={{ marginBottom: 0, height: 40 }}
        hideAdd
        activeKey={activeKey}
        size='small'
        items={items}
        onEdit={handleTabEdit}
        onTabClick={handleTabClick}
      />
    </div>
  )
}

const MultTabs = memo(Component)
export default MultTabs
