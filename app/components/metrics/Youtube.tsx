import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Card from './Card';

export const YouTube = () => {
  const { isLoading, error, data } = useQuery('/api/youtube', () =>
    fetch('https://www.youtube.com/@techxana').then((res) => res.json()),
  );
  const subscriberCount = new Number(data?.subscriberCount);
  const viewCount = new Number(data?.viewCount);
  const link = 'https://www.youtube.com/@techxana';
  useEffect(() => {
    axios.get('https://www.youtube.com/@techxana').then((res) => console.log(res));
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
      <Card header="YouTube Subscribers" link={link} metric={subscriberCount} isCurrency={false} />
      <Card header="YouTube Views" link={link} metric={viewCount} isCurrency={false} />
    </div>
  );
};
