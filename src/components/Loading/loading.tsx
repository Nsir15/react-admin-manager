import { FC, memo } from 'react';
import { Spin } from 'antd';

interface IProps {
  tip?: string;
}
const Component: FC<IProps> = props => {
  const { tip = 'loading' } = props;
  return <Spin tip={tip} size='large' className='requestLoading' fullscreen></Spin>;
};

const Loading = memo(Component);
export default Loading;
