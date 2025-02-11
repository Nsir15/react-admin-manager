import React, { FC, memo } from "react"
import { Footer } from "antd/es/layout/layout"

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props
  return <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
}

export default memo(Component)
