import { FC, memo, PropsWithChildren } from "react"
import SearchForm, { ISearchFormItem } from "../SearchForm"
import { FormInstance } from "antd"
import { BaseButtonProps } from "antd/es/button/button"
import AuthButton from "@/components/AuthButton"

export interface ITableAction {
  title: string
  type?: BaseButtonProps["type"]
  danger?: BaseButtonProps["danger"]
  auth?: string
  onClick?: () => void
}

interface IProps {
  title: string
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
  const { searchFormProps, tableActions, title } = props
  return (
    <div>
      <SearchForm {...searchFormProps} />
      <div className='baseTable'>
        <div className='tableHeader'>
          <div className='table-title'>{title}</div>
          <div className='table-actions'>
            {tableActions.map((action: ITableAction) => {
              return (
                <AuthButton type={action.type} danger={action.danger} auth={action.auth} onClick={action.onClick}>
                  {action.title}
                </AuthButton>
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
