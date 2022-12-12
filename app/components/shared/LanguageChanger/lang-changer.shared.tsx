import React, { useContext, useState } from 'react';

import { GlobalContext } from '@store/context/global.context';
import { StyledLangChangerBtn } from './Lang-changer.styled';

type Props = {};

export const LangChanger = (props: Props) => {
  const { lang, toggleLang } = useContext(GlobalContext);

  return (
    <>
      <StyledLangChangerBtn darkMode={lang === 'az' ? false : true} onClick={toggleLang}>
        {lang === 'az' ? 'AZ' : 'ENG'}
      </StyledLangChangerBtn>
    </>
  );
};
