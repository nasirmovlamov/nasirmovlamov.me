import {
  StyledHeader,
  StyledSubHeader,
} from '@styled-components/styled-components/styled-micro-components';

import { Post1 } from '@components/shared/posts/Post1';
import { Post2 } from '@components/shared/posts/Post2';
import { Post3 } from '@components/shared/posts/Post3';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

const Blog: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap justify-between max-w-270 gap-5">
      <StyledHeader className="font-bold"> {t('blog')} ⚡</StyledHeader>
      <StyledSubHeader fontSize="1.5rem" className="italic ">
        {t('blogInfo')}
      </StyledSubHeader>
      <StyledSubHeader
        fontSize="1.5rem"
        marginTop="10px"
        className="flex gap-6 flex-col md:flex-row"
      >
        <Post1 title={t('comingSoon')} slug="post 1" />
        <Post2 title={t('comingSoon')} slug="post 1" />
        <Post3 title={t('comingSoon')} slug="post 1" />
      </StyledSubHeader>
    </div>
  );
};

export default Blog;
