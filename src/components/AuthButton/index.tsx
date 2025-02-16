import { IAuthLoader } from "@/router/AuthLoader"
import { Button, ButtonProps } from "antd"
import { FC, memo } from "react"
import { useRouteLoaderData } from "react-router-dom"

interface IProps extends ButtonProps {
  auth?: string
}
const Component: FC<IProps> = props => {
  const { auth, ...restProps } = props
  const data = useRouteLoaderData<IAuthLoader>("layout")
  const { buttonList = [] } = data || {}

  if (!auth) return <Button {...restProps}>{props.children}</Button>
  if (!buttonList.includes(auth)) return null
  return <Button {...restProps}>{props.children}</Button>
}

const AuthButton = memo(Component)
export default AuthButton
