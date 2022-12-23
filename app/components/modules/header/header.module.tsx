import React, { useContext } from 'react';

import { ThemeChanger } from '@components/shared/ThemeComponent/theme-changer.shared';
import { usePathBoolReturner } from '@helpers/hooks/usePathBoolReturner';
import {
  StyledHeaderLink,
  StyledHeaderLinkFirst,
} from '@styled-components/styled-components/styled-micro-components';
import Link from 'next/link';
import { GlobalContext } from '@store/context/global.context';
import { LangChanger } from '@components/shared/LanguageChanger/lang-changer.shared';
import { useTranslation } from 'react-i18next';
type Props = {};

export const HeaderModule: React.FC = (props: Props) => {

  const { isRoute } = usePathBoolReturner();
  const { darkMode, isMenuOpen, toggleMenu, lang } = useContext(GlobalContext);
  const { t, i18n } = useTranslation('translation');
  return (
    <>
      <div className="relative flex items-center justify-between pt-10 pb-10   px-0 max-w-2xl sm:pb-16">
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="sm:hidden inline-flex items-center p-2  text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? '' : 'hidden'
          }  w-full md:block sm:hidden absolute top-20 left-0 z-50`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4   rounded-lg bg-gray-200 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-[#101110] md:dark:bg-gray-900 dark:shadow-sm dark:shadow-gray-500 sm:hidden">
            <li>
              <Link href="/" passHref>
                <span className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/chatgpt" passHref>
                <span className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  ChatGPT
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref>
                <span className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <span className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Blog
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className=" hidden sm:flex">
          <Link href="/" passHref>
            <StyledHeaderLinkFirst
              paddingLeft={'0px'}
              isDarkMode={darkMode === 'dark' ? true : false}
              bold={isRoute.home}
              className="pl-0"
            >
              {t('home')}
            </StyledHeaderLinkFirst>
          </Link>

          <Link href="/chatgpt" passHref>
            <StyledHeaderLink isDarkMode={darkMode === 'dark' ? true : false} bold={isRoute.gpt}>
              ChatGPT
            </StyledHeaderLink>
          </Link>
          <Link href="/about" passHref>
            <StyledHeaderLink isDarkMode={darkMode === 'dark' ? true : false} bold={isRoute.about}>
              {t('about')}
            </StyledHeaderLink>
          </Link>
          <Link href="/dashboard" passHref>
            <StyledHeaderLink
              isDarkMode={darkMode === 'dark' ? true : false}
              bold={isRoute.dashboard}
            >
              {t('dashboard')}
            </StyledHeaderLink>
          </Link>

          <Link href="/blog" passHref>
            <StyledHeaderLink isDarkMode={darkMode === 'dark' ? true : false} bold={isRoute.blog}>
              {t('blog')}
            </StyledHeaderLink>
          </Link>
        </div>
        <div className="flex gap-2">
          <ThemeChanger />
          <LangChanger />
        </div>
      </div>
    </>
  );
};
