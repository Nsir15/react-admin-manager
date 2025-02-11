import React, { FC, forwardRef, memo, useImperativeHandle, useMemo, useState } from "react"
import { Form, Input, Modal, Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

interface IProps {
  update?: () => void
}

export interface IRef {
  open: (type: ActionType, data?: any) => void
  close: () => void
}

export type ActionType = "create" | "edit"

const Component = forwardRef((props: IProps, ref: React.Ref<IRef>) => {
  // const {} = props
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [type, setType] = useState<ActionType>("create")
  const isEdit = useMemo(() => type === "edit", [type])

  const handleOk = async () => {
    const data = await form.validateFields()
    console.log("flag", data)

    handleCancel()
    props.update?.()
  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      open(type: ActionType, data?: any) {
        setType(type)
        setIsModalOpen(true)
        if (type === "edit" && data) {
          form.setFieldsValue(data)
          setImgUrl(data.headPic)
        }
      },
      close() {
        setIsModalOpen(false)
      }
    }
  })

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type='button'>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const title = isEdit ? "编辑用户" : "新增用户"
  return (
    <Modal title={title} open={isModalOpen} cancelText='取消' okText='确定' onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} labelAlign='right'>
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='用户名' name={"username"} rules={[{ required: true }]}>
          <Input placeholder='请输入用户名' allowClear />
        </Form.Item>
        <Form.Item label='昵称' name='nickName' rules={[{ required: true }]}>
          <Input placeholder='请输入昵称' allowClear />
        </Form.Item>
        <Form.Item label='邮箱' name='email' rules={[{ required: true }]}>
          <Input placeholder='请输入邮箱' allowClear />
        </Form.Item>
        <Form.Item label='头像' name='headPic'>
          <Upload
            showUploadList={false}
            action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
            listType='picture-circle'
          >
            {imgUrl ? <img src={imgUrl} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default memo(Component)
