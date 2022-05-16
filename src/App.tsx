import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { routes } from './router/router'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(route => (
          <Route
            key={route.name}
            path={route.path}
            element={<route.Component />}
          />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
