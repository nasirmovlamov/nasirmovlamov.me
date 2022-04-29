import { Header_Module } from '@components/modules/header/header.module'
import type { NextPage } from 'next'
import { Sty_Contact } from '@styled-components/Contact.styled'

const Home: NextPage = () => {
  return (
    <div>
        <Header_Module/>
        <Sty_Contact>Contact</Sty_Contact>
    </div>
  )
}

export default Home
