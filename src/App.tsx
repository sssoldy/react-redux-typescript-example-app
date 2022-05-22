import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { fetchCurrentUser } from './features/user/userSlice'
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Article from './pages/Article'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) dispatch(fetchCurrentUser(token))
  }, [dispatch])

  return (
    <React.Fragment>
      <Header />
      <Main>
        <Routes>
          <Route index element={<Home />} />
          <Route path=":slug" element={<Article />} />
          <Route path="@:username" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Login />} />
          <Route
            path="*"
            element={<p>There's nothing here! Router no match</p>}
          />
        </Routes>
      </Main>
      <Footer />
    </React.Fragment>
  )
}

export default App
