import { FC, memo } from "react"
import styles from "./index.module.scss"
import { Input, Button, Form, App } from "antd"
import { loginRequest } from "@/api"
import { Login } from "@/types/api"
import { wrapperRequest } from "@/utils"
import Storage from "@/utils/storage"

interface IProps {}

type FieldType = {
  username?: string
  password?: string
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const Component: FC<IProps> = props => {
  const { message } = App.useApp()

  const onFinish = async (values: Login.LoginParams) => {
    // console.log("onLogin:", values)
    const [error, data] = await wrapperRequest<Login.LoginVo>(loginRequest(values))
    // console.log("login data:", data)
    // console.log("login error:", error)

    if (!error) {
      const params = new URLSearchParams(location.search)
      message.success("登录成功")
      Storage.set("token", data!.accessToken)
      setTimeout(() => {
        location.href = params.get("callback") || "/"
      })
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles["login-wrapper"]}>
        <h1 className={styles["login-title"]}>系统登录</h1>
        <Form
          name='basic'
          {...layout}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<FieldType> label='用户名' name='username'>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='密码' name='password'>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default memo(Component)
