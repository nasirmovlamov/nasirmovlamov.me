import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  slug: string;
};

export const Post3 = ({ title, slug }: Props) => {
  return (
    // <Link href={`/blog/${slug}`} passHref>
    <div className="transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]">
      <div className="flex flex-col justify-between h-full  bg-white dark:bg-black rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
            {title}
          </h4>
        </div>
      </div>
    </div>
    // </Link>
  );
};
