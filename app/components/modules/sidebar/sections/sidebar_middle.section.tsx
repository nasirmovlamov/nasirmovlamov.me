import Link from 'next/link';
import React from 'react';
import { Sty_Sidebar_Middle } from '../sidebar.style';
type Props = {};


export const Sidebar_Link = (props: {link:string, content:string}) => {
  return (  <Link href={props.link}>{props.content}</Link>
  );
};

export const Sidebar_Middle_Section = (props: Props) => {
  return (
    <Sty_Sidebar_Middle>
      <Sidebar_Link link="/" content="Home" />
      <Sidebar_Link link="/about" content="About" />
      <Sidebar_Link link="/contact" content="Contact" />
      <Sidebar_Link link="/blogs" content="Blogs" />
      <Sidebar_Link link="/lessons" content="Lessons" />
    </Sty_Sidebar_Middle>
  );
};
