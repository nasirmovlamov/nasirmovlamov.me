import React, { useContext } from 'react';

import { ThemeChanger } from '@components/shared/ThemeComponent/theme-changer.shared';
import { usePathBoolReturner } from '@helpers/hooks/usePathBoolReturner';
import {
  StyledHeaderLink,
  StyledHeaderLinkFirst,
} from '@styled-components/styled-components/styled-micro-components';
import Link from 'next/link';
import { ThemeContext } from 'styled-components';
import { Sty_Header } from './header.style';

type Props = {};

export const HeaderModule: React.FC = (props: Props) => {
  const { isRoute } = usePathBoolReturner();
  const { darkMode } = useContext(ThemeContext);

  return (
    <Sty_Header>
      <div className="flex ">
        <Link href="/" passHref>
          <StyledHeaderLinkFirst paddingLeft={'0px'} darkMode bold={isRoute.home} className="pl-0">
            Home
          </StyledHeaderLinkFirst>
        </Link>

        <Link href="/about" passHref>
          <StyledHeaderLink darkMode bold={isRoute.about}>
            About Me
          </StyledHeaderLink>
        </Link>

        <Link href="/blog" passHref>
          <StyledHeaderLink darkMode bold={isRoute.blog}>
            Blog
          </StyledHeaderLink>
        </Link>
      </div>

      <ThemeChanger />
    </Sty_Header>
  );
};
