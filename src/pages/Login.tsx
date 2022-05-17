import * as React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/login/LoginForm'
import RegisterForm from '../components/register/RegisterForm'

const Login: React.FC = () => {
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/login'

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          {isLoginPage ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}

export default Login
