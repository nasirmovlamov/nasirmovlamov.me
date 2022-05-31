import { StyledFColumn, StyledFlex } from '@styled-components/styled-components/styled-containers'
import { StyledHeader, StyledSideParagraph, StyledSubHeader } from '@styled-components/styled-components/styled-micro-components'

import { AboutMe } from '@components/modules/aboutme/aboutme.module'
import { DashboardCard } from '@components/modules/dashboard-card/dashboard-card'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  return (
    < >
        <StyledFColumn>
            <StyledHeader>Dashboard</StyledHeader>
            <StyledSideParagraph>
              This is my personal dashboard. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more. <em>Check out my <a href="http://www.nasirmovlamov.me/blog" target="_blank" rel="noreferrer"> blog series. </a></em>
            </StyledSideParagraph>

            <StyledFlex marginTop="30px" flexWrap columnGap="20px" rowGap="20px">
              <DashboardCard title="Youtube Subscribers" viewCount={25}/>
              <DashboardCard title="Youtube Views" viewCount={25}/>
              <DashboardCard title="All-Time Views" viewCount={25}/>
            </StyledFlex>

        </StyledFColumn>

    </>
  )
}

export default Dashboard
