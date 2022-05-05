import React, { ReactComponentElement } from 'react';

import Link from 'next/link';
import { Sty_Header } from './header.style';
import { ThemeChanger } from '@components/shared/theme-changer.shared';

type Props = {};

export const Header_Module:React.FC = (props: Props) => {
  return (
    <Sty_Header>
      <div>
        <Link href="">Home</Link>
        <Link href="">Guestbook</Link>
        <Link href="">Dashboard</Link>
        <Link href="">Blog</Link>
        <Link href="">Snippets</Link>
      </div>

      <ThemeChanger />
    </Sty_Header>
  )
};
