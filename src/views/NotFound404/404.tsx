import React, { FC, memo } from "react"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props
  const navigate = useNavigate()

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => navigate("/dashboard")}>
          Back Home
        </Button>
      }
    />
  )
}

export default memo(Component)
