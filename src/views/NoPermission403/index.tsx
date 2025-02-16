import { Button, Result } from "antd"
import { FC, memo } from "react"
import { useNavigate } from "react-router-dom"

interface IProps {}
const Component: FC<IProps> = () => {
  const navigate = useNavigate()

  return (
    <Result
      status='404'
      title='404'
      subTitle='抱歉，没有权限访问该页面.'
      extra={
        <Button type='primary' onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  )
}

export default memo(Component)
