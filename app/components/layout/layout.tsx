import { GlobalProvider } from '@store/context/global.context';
import React, { ReactElement, ReactFragment, useContext, useState } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();
type Props = {
  children: ReactFragment;
};

export const Layout = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>{children}</GlobalProvider>
    </QueryClientProvider>
  );
};
