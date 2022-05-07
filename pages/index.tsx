import { AboutMe } from '@components/modules/aboutme/aboutme.module'
import { CustomThemeContext } from '@store/context/theme.context'
import type { NextPage } from 'next'
import { Sty_Contact } from '@styled-components/Contact.styled'

const Home: NextPage = () => {
  return (
    <>
       <AboutMe/>
    </ >
  )
}

export default Home
