import React from 'react';
import { SVG_outerlink } from '@media/icons/svg-outerlink';
import { StyledDashboardCard } from './dashboard-card.style';
type Props = {
  title: string;
  viewCount: number | string;
  link?: string;
};

export const DashboardCard = (props: Props) => {
  return (
    <StyledDashboardCard>
      <div className="card-title flex gap-2 items-center">
        {props.title}{' '}
        <a href={props.link} target="_blank" rel="noreferrer">
          {' '}
          <SVG_outerlink />
        </a>
      </div>
      <div className="card-view-count">{props.viewCount}</div>
    </StyledDashboardCard>
  );
};
