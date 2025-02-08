import { hideLoading, showLoading } from '@/components/Loading';
import request from '@/utils/request';
import React, { FC, memo, useEffect } from 'react';

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props

  const login = () => {
    request
      .post('/login', {
        username: 'admin',
        password: '123456'
      })
      .then(res => {
        console.log('login res:', res);
      });
  };

  useEffect(() => {
    login();
  }, []);
  return <div>Login</div>;
};

export default memo(Component);
