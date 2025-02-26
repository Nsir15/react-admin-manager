// Entry component
import { App } from "antd"
import type { MessageInstance } from "antd/es/message/interface"
import type { ModalStaticFunctions } from "antd/es/modal/confirm"
import type { NotificationInstance } from "antd/es/notification/interface"

let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, "warn">

export default () => {
  const staticFunction = App.useApp()
  message = staticFunction.message
  modal = staticFunction.modal
  notification = staticFunction.notification
  // 空组件，主要是为了全局绑定这几个属性值，方便全局调用
  return null
}

export { message, notification, modal }
