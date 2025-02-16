import { IAuthLoader } from "@/router/AuthLoader"
import { findTreePath } from "@/utils"
import { Breadcrumb } from "antd"
import { FC, memo } from "react"
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom"

interface IProps {}
const Component: FC<IProps> = () => {
  // const {} = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { menuList } = useRouteLoaderData("layout") as IAuthLoader

  const pathList = findTreePath(pathname, menuList, [])
  console.log("pathList:", pathList)
  const items = [
    {
      title: (
        <a href='#' onClick={handleClick}>
          首页
        </a>
      )
    },
    ...pathList.map(item => {
      return {
        title: item
      }
    })
  ]

  function handleClick(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    ev.preventDefault()
    navigate("/")
  }

  return <Breadcrumb items={items} />
}

export default memo(Component)
