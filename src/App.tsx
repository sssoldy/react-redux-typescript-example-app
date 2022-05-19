import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </React.Fragment>
  )
}

export default App
