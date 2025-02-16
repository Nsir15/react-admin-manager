import { FC, memo } from "react"
import styles from "./index.module.scss"
import { Dropdown, MenuProps, Space, Switch } from "antd"
import useStore from "@/store"
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from "@ant-design/icons"
import { useShallow } from "zustand/shallow"
import BreadCrumb from "./BreadCrumb"

interface IProps {}
const Component: FC<IProps> = () => {
  const { collapsed, updateCollapsed, theme, updateTheme, nickName } = useStore(
    useShallow(state => ({
      collapsed: state.collapsed,
      updateCollapsed: state.updateCollapsed,
      theme: state.theme,
      updateTheme: state.updateTheme,
      nickName: state.userInfo.nickName
    }))
  )

  const isDark = theme === "dark"

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "我的账号",
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

  function handleSwitchChange(isDark: boolean) {
    if (!isDark) {
      // 默认
      document.documentElement.classList.remove("dark")
    } else {
      // 暗黑
      document.documentElement.classList.add("dark")
    }
    updateTheme(isDark)
  }

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
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleSwitchChange}
        />
        <Dropdown menu={{ items }}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              {nickName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default memo(Component)
