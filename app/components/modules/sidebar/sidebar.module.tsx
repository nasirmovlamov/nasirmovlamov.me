import {
  Sidebar_Bottom_Section,
  Sidebar_Middle_Section,
  Sidebar_Top_Section,
} from './sections/sidebar.sections.export';

import React from 'react';
import { Sty_Sidebar } from './sidebar.style';

type Props = {};

export const Sidebar_Module = (props: Props) => {
  return (
    <Sty_Sidebar>
      <Sidebar_Top_Section />
      <Sidebar_Middle_Section />
      <Sidebar_Bottom_Section />
    </Sty_Sidebar>
  );
};
