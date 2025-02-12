import { FC, memo } from "react"
import { ISearchFormItem } from "@/components/SearchForm"
import { Form, Space, Table, Tag, TableProps, Popconfirm } from "antd"
import { useAntdTable } from "ahooks"
import { TableResult } from "@/types/api"
import request from "@/utils/request"
import PageTable, { ITableAction } from "@/components/PageTable"

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
  const [form] = Form.useForm()

  const fetchTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Object
  ): Promise<TableResult<any>> => {
    return request.get("/sys/menu/list", {
      current,
      pageSize,
      ...formData
    })
  }

  const handleDelete = () => {}
  const handleCreate = () => {}

  const searchFields: ISearchFormItem[] = [
    {
      type: "input",
      label: "菜单名称",
      name: "userName",
      placeholder: "请输入菜单名称"
    },
    {
      type: "select",
      label: "菜单状态",
      name: "menuState"
    }
  ]

  const tableActions: ITableAction[] = [
    {
      title: "新增",
      type: "primary",
      onClick: handleCreate
    },
    {
      title: "批量删除",
      danger: true
    }
  ]

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

  const { tableProps, search } = useAntdTable(fetchTableData, {
    defaultPageSize: 10,
    form
  })

  return (
    <div>
      <PageTable
        searchFormProps={{
          form,
          searchFields,
          formInitialValues: {},
          onReset: search.reset,
          onSubmit: search.submit
        }}
        tableActions={tableActions}
      >
        <Table<DataType> rowKey='email' columns={columns} {...tableProps} />
      </PageTable>
    </div>
  )
}

export default memo(Component)
