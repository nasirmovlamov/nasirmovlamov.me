import { StyledFlex } from '@styled-components/styled-components/styled-containers';

import { DashboardCard } from '@components/modules/dashboard-card/dashboard-card';
import type { NextPage } from 'next';
import { YouTube } from '@components/metrics/Youtube';
import { useTranslation } from 'react-i18next';

const Dashboard: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="max-w-2xl">
        <h1 className="mb-1 text-black dark:text-white text-5xl">{t('dashboard')}</h1>
        <p className="text-black dark:text-white max-w-2xl">{t('dashboardInfo')}</p>
        {/* <YouTube /> */}
        <div className="flex flex-wrap mt-2 gap-2 ">
          <DashboardCard
            link="https://www.youtube.com/@techxana9447"
            title={t('ytSubscribers')}
            viewCount={561}
          />
          <DashboardCard
            link="https://www.youtube.com/@techxana9447"
            title={t('ytViews')}
            viewCount={'20,4 ' + t('thousand')}
          />
          <DashboardCard
            link="https://www.youtube.com/@techxana9447"
            title={t('ytWatchTime')}
            viewCount={'1400 ' + t('hour')}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
