import {
  StyledHeader,
  StyledSubHeader,
} from '@styled-components/styled-components/styled-micro-components';

import { Post1 } from '@components/shared/posts/Post1';
import { Post2 } from '@components/shared/posts/Post2';
import { Post3 } from '@components/shared/posts/Post3';
import type { NextPage } from 'next';

const Physics: NextPage = () => {
  return (
    <div className="flex flex-wrap justify-between max-w-270 gap-5">
      <StyledHeader className="font-bold"> Blog ⚡</StyledHeader>
      <StyledSubHeader fontSize="1.5rem" className="italic ">
        Everything I enjoyed during learning
      </StyledSubHeader>
      <StyledSubHeader
        fontSize="1.5rem"
        marginTop="10px"
        className="flex gap-6 flex-col md:flex-row"
      >
        <Post1 title="Coming soon" />
        <Post2 title="Coming soon" />
        <Post3 title="Coming soon" />
      </StyledSubHeader>
    </div>
  );
};

export default Physics;
