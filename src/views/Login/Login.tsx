import React, { FC, memo } from 'react';

interface IProps {}
const Component: FC<IProps> = props => {
  // const {} = props
  return <div>Login</div>;
};

export default memo(Component);
