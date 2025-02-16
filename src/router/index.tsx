import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import Login from "@/views/Login/Login"
import NotFound404 from "@/views/NotFound404/404"
import Layout from "@/layout"
import AuthLoader from "./AuthLoader"
import LazyLoader from "@/components/LazyLoader"
import React from "react"
import NoPermission403 from "@/views/NoPermission403"

type RouteMetaObj = {
  auth?: boolean
  name?: string
  [key: string]: any
}

/**
 * 当我们使用 RouteMetaObj & RouteObject 这样的交叉类型时，TypeScript 会将 index 的类型推断为 boolean | undefined，这比原始 RouteObject 中要求的 false | undefined 更宽松，所以会产生类型错误。
 * 即使我们没有显式设置 index 属性，这个类型冲突依然存在。这就是为什么我们需要在类型定义中明确指定
 */
export type IRouteObj = Omit<RouteObject, "children" | "index"> &
  RouteMetaObj & {
    children?: IRouteObj[]
    index?: false
  }

export const routes: IRouteObj[] = [
  {
    path: "/",
    name: "首页",
    element: <Navigate to={"/welcome"}></Navigate>
  },
  {
    id: "layout",
    loader: AuthLoader,
    element: <Layout></Layout>,
    children: [
      {
        path: "/welcome",
        name: "欢迎页",
        element: <div>Welcome</div>
      },
      {
        path: "/dashboard",
        element: <div>dashboard</div>
      },
      {
        path: "/userList",
        name: "用户管理",
        element: LazyLoader(React.lazy(() => import("@/views/system/user")))
      },
      {
        path: "/menuList",
        name: "菜单管理",
        element: LazyLoader(React.lazy(() => import("@/views/system/menu")))
      }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "*",
    element: <Navigate to={"/404"} />
  },
  {
    path: "/404",
    element: <NotFound404 />
  },
  {
    path: "/403",
    element: <NoPermission403 />
  }
]

export default createBrowserRouter(routes)

// export default function Router() {
//   return useRoutes(routes)
// }
