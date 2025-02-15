import { http, HttpResponse } from "msw"
import { menuList, userPermission } from "./menu"
import envConfig from "@/config"

/**
 * 获取全量的路径 ，项目中使用的是 axios 请求，默认配置了 baseUrl 是 http://localhost:3000 ,所以要想拦截到，这里就得拼接上域名，使用正则，可以匹配到 请求后面带参数情况
 * @param apiPath
 */
function getFullPathReg(apiPath: string) {
  return new RegExp(`${envConfig.baseApi}${apiPath}`)
}

export const handlers = [
  // 获取菜单列表
  http.get(getFullPathReg("/sys/menu/list"), ({ request }) => {
    console.log("Request intercepted by MSW----------:", request.url)
    return HttpResponse.json({
      code: 200,
      message: "success",
      data: {
        list: menuList,
        page: {
          total: 10
        }
      }
    })
  }),

  // 获取用户权限
  http.get("http://localhost:3000/users/getPermissionList", ({ request }) => {
    console.log("Request intercepted by MSW----------:", request.url)
    return HttpResponse.json(
      {
        code: 200,
        message: "success",
        data: userPermission
      },
      {
        status: 200
      }
    )
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
