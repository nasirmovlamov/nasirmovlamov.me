import {
  StyledHeader,
  StyledParagraph,
  StyledSubHeader,
} from '@styled-components/styled-components/styled-micro-components';

import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

const About: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap justify-between max-w-270">
      <StyledHeader> {t('about')}</StyledHeader>
      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        {t('links')}
      </StyledSubHeader>
      <ul style={{ listStyle: 'none' }}>
        <li>
          Twitter : <a href="https://twitter.com/nasirmovlamov"> @nasirmovlamov</a>
        </li>
        <li>
          Github : <a href="https://github.com/nasirmovlamov"> @nasirmovlamov</a>
        </li>
        {/* <li>
          LinkedIn : <a href="https://linkedin.com/nasirmovlamov"> @nasirmovlamov</a>
        </li> */}
      </ul>

      <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        {t('education')}
      </StyledSubHeader>

      <StyledParagraph>{t('educationInfo')}</StyledParagraph>

      {/* <StyledSubHeader fontSize="1.5rem" marginTop="30px">
        Research
      </StyledSubHeader>

      <StyledParagraph>
        Data encryption and vulnerability analysis at software infrastructures
      </StyledParagraph> */}
    </div>
  );
};

export default About;
