import React, { FC, memo, useEffect, useRef } from "react"
import styles from "./index.module.scss"
import { useForm } from "antd/es/form/Form"
import { Button, Form, Input, Popconfirm, Space, Table, TableProps, Tag } from "antd"
import CreateUser, { IRef } from "./createUser"
import SearchForm from "@/components/SearchForm"
import PageTransition from "@/components/PageTransition"

interface IProps {}

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
]

const Component: FC<IProps> = props => {
  // const {} = props

  const modalRef = useRef<IRef>(null)
  const [form] = useForm()

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "标签",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? "geekblue" : "green"
            if (tag === "loser") {
              color = "volcano"
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <a>编辑</a>
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleDelete()}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const queryData = () => {}

  const handleSubmit = () => {}
  const handleReset = () => {}
  const handleCreate = () => {
    modalRef.current?.open("create")
  }
  const handleDelete = () => {}

  // TODO 后面使用 ahooks 的 useAntdTable 来请求数据
  useEffect(() => {
    queryData()
  }, [])

  return (
    <PageTransition>
      <div className={styles.userList}>
        <div className={"searchForm"}>
          <SearchForm form={form} initialValues={{}}>
            <Form.Item label='Field A'>
              <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field B'>
              <Input placeholder='input placeholder' />
            </Form.Item>
          </SearchForm>
        </div>
        <div className='baseTable'>
          <div className='tableHeader'>
            <div className='table-title'>用户列表</div>
            <div className='table-actions'>
              <Button type='primary' onClick={handleCreate}>
                新增
              </Button>
              <Button type='primary' danger>
                批量删除
              </Button>
            </div>
          </div>
          <Table<DataType> columns={columns} dataSource={data} />
        </div>
        <CreateUser ref={modalRef} />
      </div>
    </PageTransition>
  )
}

export default memo(Component)
