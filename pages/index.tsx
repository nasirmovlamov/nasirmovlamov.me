import { AboutMe } from '@components/modules/aboutme/aboutme.module'
import { Header_Module } from '@components/modules/header/header.module'
import type { NextPage } from 'next'
import { Sty_Contact } from '@styled-components/Contact.styled'

const Home: NextPage = () => {
  return (
    <>
       <AboutMe/>
    </>
  )
}

export default Home
