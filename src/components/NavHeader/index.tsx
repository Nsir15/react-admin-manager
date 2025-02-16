import { FC, memo } from "react"
import styles from "./index.module.scss"
import { Dropdown, MenuProps, Space, Switch } from "antd"
import useStore from "@/store"
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from "@ant-design/icons"
import { useShallow } from "zustand/shallow"
import BreadCrumb from "./BreadCrumb"

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props
  const { collapsed, updateCollapsed } = useStore(
    useShallow(state => ({
      collapsed: state.collapsed,
      updateCollapsed: state.updateCollapsed
    }))
  )

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true
    },
    {
      type: "divider"
    },
    {
      key: "2",
      label: "用户信息",
      icon: <SettingOutlined />,
      extra: "⌘P"
    },
    {
      key: "3",
      label: "退出登录",
      icon: <SettingOutlined />,
      extra: "⌘B"
    }
  ]

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div
          style={{
            width: 30,
            height: 30,
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
          onClick={updateCollapsed}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadCrumb />
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' defaultChecked style={{ marginRight: 10 }} />
        <Dropdown menu={{ items }}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              Jack Ma
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default memo(Component)
