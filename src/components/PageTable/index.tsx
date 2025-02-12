import { FC, memo, PropsWithChildren } from "react"
import SearchForm, { ISearchFormItem } from "../SearchForm"
import { Button, FormInstance } from "antd"
import { BaseButtonProps } from "antd/es/button/button"

export interface ITableAction {
  title: string
  type?: BaseButtonProps["type"]
  danger?: BaseButtonProps["danger"]
  onClick?: () => void
}

interface IProps {
  searchFormProps: {
    form?: FormInstance<any>
    formInitialValues: Object
    searchFields?: ISearchFormItem[]
    onReset: () => void
    onSubmit: () => void
  }
  tableActions: ITableAction[]
}

const Component: FC<PropsWithChildren<IProps>> = props => {
  const { searchFormProps, tableActions } = props
  return (
    <div>
      <SearchForm {...searchFormProps} />
      <div className='baseTable'>
        <div className='tableHeader'>
          <div className='table-title'>菜单列表</div>
          <div className='table-actions'>
            {tableActions.map((action: ITableAction) => {
              return (
                <Button type={action.type} danger={action.danger} onClick={action.onClick}>
                  {action.title}
                </Button>
              )
            })}
          </div>
        </div>
        {props.children}
        {/* <Table<any> rowKey='email' columns={columns} {...tableProps} /> */}
      </div>
    </div>
  )
}

const PageTable = memo(Component)
export default PageTable
