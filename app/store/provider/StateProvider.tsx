import React, { Children, ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const StateProvider = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default StateProvider;
