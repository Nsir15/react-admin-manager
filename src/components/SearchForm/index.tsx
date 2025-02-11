import { Button, Form, FormInstance, Space } from "antd"
import { FC, memo, PropsWithChildren } from "react"

interface IProps {
  form?: FormInstance<any>
  initialValues?: Record<string, any>
  onSubmit?: () => void
  onReset?: () => void
}
const Component: FC<PropsWithChildren<IProps>> = props => {
  const { form, initialValues } = props

  return (
    <div className='searchForm'>
      <Form layout={"inline"} form={form} initialValues={initialValues}>
        {props.children}
        <Form.Item>
          <Space>
            <Button type='primary' onClick={props.onSubmit}>
              提交
            </Button>
            <Button color='danger' onClick={props.onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default memo(Component)
