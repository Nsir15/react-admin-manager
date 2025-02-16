import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import Login from "@/views/Login/Login"
import NotFound404 from "@/views/NotFound404/404"
import Layout from "@/layout"
import AuthLoader from "./AuthLoader"
import LazyLoader from "@/components/LazyLoader"
import React from "react"
import NoPermission403 from "@/views/NoPermission403"

type RouteMetaObj = Record<string, any>
export type IRouteObj = RouteObject & RouteMetaObj

export const routes: IRouteObj[] = [
  {
    path: "/",
    element: <Navigate to={"/welcome"}></Navigate>
  },
  {
    id: "layout",
    loader: AuthLoader,
    element: <Layout></Layout>,
    children: [
      {
        path: "/welcome",
        element: <div>Welcome</div>
      },
      {
        path: "/dashboard",
        element: <div>dashboard</div>
      },
      {
        path: "/userList",
        element: LazyLoader(React.lazy(() => import("@/views/system/user")))
      },
      {
        path: "/menuList",
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
