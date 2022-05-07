import React, { ReactComponentElement, useEffect } from 'react';

import Link from 'next/link';
import { Sty_Header } from './header.style';
import { StyledFlex } from '@styled-components/styled-components/styled-containers';
import { StyledHeaderLink } from '@styled-components/styled-components/styled-micro-components';
import { ThemeChanger } from '@components/shared/theme-changer.shared';
import { usePathBoolReturner } from '@helpers/hooks/usePathBoolReturner';
import { useRouter } from 'next/router';

type Props = {};

export const HeaderModule:React.FC = (props: Props) => {
  const {isRoute} = usePathBoolReturner()

  useEffect(() => {
    console.log(isRoute.home)
  }, [isRoute])


  return (
    <Sty_Header>
      <StyledFlex>
        <Link href="/">
          <StyledHeaderLink  bold={isRoute.home}>
            Home
          </StyledHeaderLink>
        </Link>

        <Link href="guestbook">
          <StyledHeaderLink bold={isRoute.guestbook}>
          Guestbook
          </StyledHeaderLink>
        </Link>

        <Link href="dashboard">
          <StyledHeaderLink bold={isRoute.dashboard}>
            Dashboard
          </StyledHeaderLink>
        </Link>

        <Link href="blog">
          <StyledHeaderLink bold={isRoute.blog}>
            Blog
          </StyledHeaderLink>
        </Link>

        <Link href="snippets">
          <StyledHeaderLink bold={isRoute.snippets}>
            Snippets
          </StyledHeaderLink>
        </Link>
      </StyledFlex>

      <ThemeChanger />
    </Sty_Header>
  )
};
