import { AboutMe } from '@components/modules/aboutme/aboutme.module'
import { CustomThemeContext } from '@store/context/theme.context'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
       <AboutMe/>
    </ >
  )
}

export default Home
