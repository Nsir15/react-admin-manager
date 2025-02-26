/**
 * 工具函数
 */

import { IRouteObj } from "@/router"
import dayjs from "dayjs"
import { message } from "./AntdGlobal"
import { System } from "@/types/api"

/**
 * 格式化数字为人民币格式的字符串
 *
 * @param number 要格式化的数字或数字字符串
 * @returns 格式化后的人民币字符串
 */
export function formatMoneyNumber(number: number | string) {
  // 使用 toLocaleString 方法格式化数字,只支持 数字类型.toLocaleString()
  // const strNum = parseFloat(number.toString());
  // const decimalsCount = number.toString().split('.')[1]?.length || 0;
  // return strNum.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: decimalsCount });

  // 使用正则的方式
  const regex = /(\d)(?=(\d{3})+$)/g
  const parts = number.toString().split(".")
  parts[0] = parts[0].replace(regex, "$1,")
  return "¥" + parts.join(".")
}

export async function wrapperRequest<T, U = any>(
  request: Promise<T>,
  showError: boolean = true
): Promise<[U | null, T | null]> {
  try {
    const data = await request
    return [null, data]
  } catch (error) {
    // if (showError) {
    //   message.error(error)
    // }
    return [error as U, null]
  }
}

export function formatDate(date: Date | string, fmt = "YYYY-MM-DD HH:mm:ss") {
  if (!date) return ""
  const curDate = dayjs(date)
  return curDate.format(fmt)
}

/**
 * 延迟多少秒
 * @param time
 * @returns
 */
export function delayTime(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("")
    }, time)
  })
}

export function findRoute(
  pathname: string,
  routes: IRouteObj[] | System.IMenuItem[]
): IRouteObj | System.IMenuItem | null {
  for (const route of routes) {
    if (route.path === pathname) return route
    if (route.children && route.children.length) {
      const result = findRoute(pathname, route.children)
      // 有了结果再 return，不然 for循环就中断了
      if (result) return result
    }
  }
  return null
}

export function findTreePath(pathname: string, menuList: System.IMenuItem[], pathList: string[]) {
  if (!menuList) return []
  for (const menu of menuList) {
    pathList.push(menu.menuName)
    if (menu.path === pathname) return pathList
    if (!menu.buttons && menu.children && menu.children.length) {
      return findTreePath(pathname, menu.children, pathList)
    }
    pathList.pop()
  }
  return []
}
