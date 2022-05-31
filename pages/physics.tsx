import { StyledHeader, StyledParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'

import type { NextPage } from 'next'
import { Post1 } from '@components/shared/posts/Post1'
import { Post2 } from '@components/shared/posts/Post2'
import { Post3 } from '@components/shared/posts/Post3'
import { StyledFColumn } from '@styled-components/styled-components/styled-containers'

const Physics: NextPage = () => {
  return (
    <StyledFColumn>
      <StyledHeader className="font-bold"> Physics Blog ⚡</StyledHeader>
      <StyledSubHeader fontSize="1.5rem" className="italic ">Everything I enjoyed during learning physics</StyledSubHeader>


      {/* <StyledSubHeader fontSize="1.5rem" marginTop="30px"  className="font-mono">
        Recent Posts
      </StyledSubHeader> */}
      <StyledSubHeader fontSize="1.5rem" marginTop="10px" className="flex gap-6 flex-col md:flex-row">
        <Post1 title="Coming soon" />
        <Post2 title="Coming soon" />
        <Post3 title="Coming soon" />
      </StyledSubHeader>

      {/* <StyledSubHeader fontSize="1.5rem" marginTop="30px" className="font-mono">
        Most Read
      </StyledSubHeader>
      <StyledSubHeader fontSize="1.5rem" marginTop="30px" className="flex gap-6 flex-col md:flex-row">
        <Post1 title="Everything I Know About Style Guides, Design Systems, and Component Libraries" />
        <Post2 title="Everything I Know About Style Guides, Design Systems, and Component Libraries" />
        <Post3 title="Everything I Know About Style Guides, Design Systems, and Component Libraries" />
      </StyledSubHeader> */}

    </StyledFColumn>
  )
}

export default Physics
