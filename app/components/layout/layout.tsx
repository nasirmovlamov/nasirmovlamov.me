import React, { ReactElement, ReactFragment, useContext, useState } from 'react';

import { CustomThemeProvider } from '@store/context/theme.context';

type Props = {
  children: ReactFragment;
};

export const Layout = ({ children }: Props) => {

  return (
    <CustomThemeProvider>
        {children}
    </CustomThemeProvider>
  );
};
