import React, { ReactElement } from 'react';

import { Sidebar_Module } from '@components/modules/sidebar/sidebar.module';
import { Sty_Layout } from './Layout.style';

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  return (
    <Sty_Layout>
      <Sidebar_Module />
      {children}
    </Sty_Layout>
  );
};
