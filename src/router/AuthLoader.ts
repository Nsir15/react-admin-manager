import { getPermissionList } from "@/api"
import { System } from "@/types/api"
import { delayTime, wrapperRequest } from "@/utils"

export interface IAuthLoader {
  buttonList: string[]
  menuList: System.IMenuItem[]
  menuPathList: string[]
}

// menuState:1 有效， menuType:1 - 菜单 ， menuType:2 - 按钮 , !item.buttons 说明当前是叶子节点了
function getMenuPathList(menuList: System.IMenuItem[]): string[] {
  return menuList.reduce((result, menuItem) => {
    return result.concat(
      Array.isArray(menuItem.children) && menuItem.children.length && !menuItem.buttons
        ? getMenuPathList(menuItem.children)
        : menuItem.path + ""
    )
  }, [] as string[])
}

export default async function AuthLoader(): Promise<IAuthLoader> {
  // 获取用户的权限信息
  // TODO 这一步主要是为了等待MSW服务初始化完成，使用外部接口就不需要这一步
  await delayTime(200)
  const [error, data] = await wrapperRequest(getPermissionList())
  console.log("err:", error)
  console.log("data:", data)
  let menuPathList: string[] = []
  if (data) {
    const { menuList } = data
    // 根据 menuList 生成扁平化的所有的 有权限的 menuPath
    menuPathList = getMenuPathList(menuList)
  }

  return {
    buttonList: data?.buttonList || [],
    menuList: data?.menuList || [],
    menuPathList
  }
}
