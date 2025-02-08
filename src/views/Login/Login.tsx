import { hideLoading, showLoading } from '@/components/Loading';
import React, { FC, memo, useEffect } from 'react';

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props
  useEffect(() => {
    showLoading();

    setTimeout(() => {
      hideLoading();
    }, 3000);
  }, []);
  return <div>Login</div>;
};

export default memo(Component);
