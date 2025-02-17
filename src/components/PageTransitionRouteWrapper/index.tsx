/**
 * - AnimatePresence 必须直接包裹需要动画的组件
- AnimatePresence 需要能够访问到当前路由的 location 信息
- 避免多个 AnimatePresence 嵌套，这可能会导致动画冲突
 */
import { FC, memo, PropsWithChildren } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import PageTransition from "../PageTransition"
import { AnimatePresence } from "framer-motion"

interface IProps {}

const Component: FC<PropsWithChildren<IProps>> = () => {
  const outlet = useOutlet()
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <PageTransition key={location.pathname}>{outlet}</PageTransition>
    </AnimatePresence>
  )
}

const PageTransitionRouteWrapper = memo(Component)
export default PageTransitionRouteWrapper
