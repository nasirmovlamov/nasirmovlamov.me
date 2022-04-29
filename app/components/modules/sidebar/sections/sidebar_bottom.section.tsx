import { Sty_Sidebar_Bottom, Sty_Sidebar_Social } from '../sidebar.style';

import React from 'react';

type Props = {};

export const Sidebar_Bottom_Section = (props: Props) => {
  return (
    <Sty_Sidebar_Bottom>
      <Sty_Sidebar_Social href="#" target="_blank">
        f
      </Sty_Sidebar_Social>

      <Sty_Sidebar_Social href="#" target="_blank">
        i
      </Sty_Sidebar_Social>

      <Sty_Sidebar_Social href="#" target="_blank">
        t
      </Sty_Sidebar_Social>
    </Sty_Sidebar_Bottom>
  );
};
