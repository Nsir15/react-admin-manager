import { FC, memo } from "react"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

interface IProps {}
const Component: FC<IProps> = () => {
  const navigate = useNavigate()

  return (
    <Result
      status='404'
      title='404'
      subTitle='抱歉，您访问的页面不存在.'
      extra={
        <Button type='primary' onClick={() => navigate("/dashboard")}>
          回到首页
        </Button>
      }
    />
  )
}

export default memo(Component)
