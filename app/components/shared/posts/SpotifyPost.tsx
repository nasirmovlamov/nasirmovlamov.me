import Link from 'next/link'
import React from 'react'
import TimeAgo from 'javascript-time-ago'

type Props = {
  url:string,
  artist:string,
  name:string,
  externalUrl:string,
  playedAt:string,
}

export const SpotifyPost = (props: Props) => {
  TimeAgo.addDefaultLocale(require('javascript-time-ago/locale/en'))
  const timeAgo = new TimeAgo('en-US')
  const playedAt = timeAgo.format(new Date(props.playedAt))

  return (
    <a href={`${props.externalUrl}`} target="_blank" rel="noreferrer" className='w-full'>
      <div className='transform hover:scale-[1.01] transition-all rounded-xl  bg-gradient-to-r p-1 from-[#21d115] to-[#0E1528] cursor-pointer w-full'>
        <div className='flex items-center h-full  bg-red-100 dark:bg-black rounded-lg p-4  gap-10'>
          <div className='flex flex-col '>
              <img src={props.url} width={100} style={{borderRadius:"50%"}} alt="" />
          </div>
          <div className='flex flex-col'>
              <h4 className='text-lg md:text-lg font-medium  w-full text-gray-900 dark:text-gray-100 tracking-tight'>
                {props.artist}
              </h4>
              <h3 className='text-lg md:text-lg font-medium  w-full text-gray-900 dark:text-gray-100 tracking-tight'>
                {props.name}
              </h3>
              <h5 className='text-lg md:text-lg font-medium  w-full text-gray-900 dark:text-gray-100 tracking-tight'>
                {playedAt}
              </h5>
          </div>

        </div>
      </div>
    </a>
  )
}

