import { FC, memo } from "react"
import { ISearchFormItem } from "@/components/SearchForm"
import { Form, Space, Table, TableProps, Button } from "antd"
import { useAntdTable } from "ahooks"
import { System, TableResult } from "@/types/api"
import PageTable, { ITableAction } from "@/components/PageTable"
import { formatDate } from "@/utils"
import { getMenuList } from "@/api"

interface IProps {}

const Component: FC<IProps> = props => {
  // const {} = props
  const [form] = Form.useForm()

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
      name: "menuState",
      options: [
        {
          label: "正常",
          value: 1
        },
        {
          label: "停用",
          value: 2
        }
      ]
    }
  ]

  const fetchTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Object
  ): Promise<TableResult<System.IMenuItem>> => {
    return getMenuList({
      current,
      pageSize,
      ...formData
    }).then(res => {
      return {
        list: res.list,
        total: res.page.total
      }
    })
  }

  const handleDelete = (record: System.IMenuItem) => {}
  const handleCreate = () => {}

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

  const handleSubCreate = (record: System.IMenuItem) => {}
  const handleEdit = (record: System.IMenuItem) => {}

  const columns: TableProps<System.IMenuItem>["columns"] = [
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName"
    },
    {
      title: "菜单图标",
      dataIndex: "icon",
      key: "icon"
    },
    {
      title: "菜单类型",
      dataIndex: "menuType",
      key: "menuType",
      render(menuType: number) {
        return {
          1: "菜单",
          2: "按钮",
          3: "页面"
        }[menuType]
      }
    },
    {
      title: "权限标识",
      dataIndex: "menuCode",
      key: "menuCode"
    },
    {
      title: "路由地址",
      dataIndex: "path",
      key: "path"
    },
    {
      title: "组件名称",
      dataIndex: "component",
      key: "component"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      }
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
        <Table<System.IMenuItem> bordered rowKey='_id' columns={columns} {...tableProps} />
      </PageTable>
    </div>
  )
}

export default memo(Component)
