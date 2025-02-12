import { http, HttpResponse } from "msw"
import { menuList } from "./menu"
import envConfig from "@/config"

export const handlers = [
  // 处理 GET 请求
  http.get(new RegExp(`${envConfig.baseApi}/sys/menu/list`), ({ request }) => {
    console.log("Request intercepted by MSW----------:", request.url)
    return HttpResponse.json({
      code: 200,
      message: "success",
      data: menuList
    })
  })
  // 处理 POST 请求示例
  // http.post("/api/users", async ({ request }) => {
  //   const newUser = await request.json()
  //   userList.push(newUser)
  //   return HttpResponse.json(
  //     {
  //       code: 201,
  //       message: "User created successfully",
  //       data: newUser
  //     },
  //     {
  //       status: 201
  //     }
  //   )
  // })
]
