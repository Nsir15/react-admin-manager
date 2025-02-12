import { Button, Form, FormInstance, Input, Select, Space } from "antd"
import { Rule } from "antd/es/form"
import { FC, memo, PropsWithChildren } from "react"

export interface ISearchFormItem {
  label: string
  name: string
  type: "select" | "input"
  placeholder?: string
  rules?: Rule[]
  options?: any[]
}

interface IProps {
  form?: FormInstance<any>
  initialValues?: Record<string, any>
  searchFields?: ISearchFormItem[]
  onSubmit?: () => void
  onReset?: () => void
}
const Component: FC<PropsWithChildren<IProps>> = props => {
  const { form, initialValues, searchFields } = props

  return (
    <div className='searchForm'>
      <Form layout={"inline"} form={form} initialValues={initialValues}>
        {props.children}
        {searchFields?.map((field: ISearchFormItem) => {
          switch (field.type) {
            case "input": {
              return (
                <Form.Item label={field.label} name={field.name} rules={field.rules}>
                  <Input placeholder={field.placeholder} />
                </Form.Item>
              )
            }
            case "select": {
              return (
                <Form.Item label={field.label} name={field.name} rules={field.rules}>
                  <Select placeholder={field.placeholder}>
                    {field.options?.map(option => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )
            }
            default:
              return null
          }
        })}
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
