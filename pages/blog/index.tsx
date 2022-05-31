import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledSideParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'

import { AboutMe } from '@components/modules/aboutme/aboutme.module'
import type { NextPage } from 'next'

const Blog: NextPage = () => {
  return (
    <StyledFlex>
       <StyledFColumn>
            <StyledHeader>Blog Posts</StyledHeader>

            <StyledSideParagraph>
              I have been writing online since 2018, mostly about software engineering and interesting concepts of javascript, typescript, react.
              <br/>
              <em>Use the search below to filter by title.</em>
            </StyledSideParagraph>

        </StyledFColumn>
    </StyledFlex>
  )
}

export default Blog
