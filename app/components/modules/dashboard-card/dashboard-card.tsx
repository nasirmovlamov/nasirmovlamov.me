import React from 'react'
import {SVG_outerlink} from '@media/icons/svg-outerlink'
import { StyledDashboardCard } from './dashboard-card.style'
type Props = {
  title:string,
  viewCount:number,
}

export const DashboardCard = (props: Props) => {
  return (
    <StyledDashboardCard>
      <div className='card-title'>{props.title}  <SVG_outerlink/></div>
      <div className='card-view-count'>{props.viewCount}</div>
    </StyledDashboardCard>
  )
}

