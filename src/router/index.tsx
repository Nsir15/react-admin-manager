import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import Login from "@/views/Login/Login"
import NotFound404 from "@/views/NotFound404/404"
import Layout from "@/layout"
import User from "@/views/system/user"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/welcome"}></Navigate>
  },
  {
    element: <Layout></Layout>,
    children: [
      {
        path: "welcome",
        element: <div>Welcome</div>
      },
      {
        path: "userList",
        element: <User />
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
    path: "404",
    element: <NotFound404 />
  }
]

export default createBrowserRouter(routes)
// export default function Router() {
//   return useRoutes(routes)
// }
