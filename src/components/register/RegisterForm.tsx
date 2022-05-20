import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchRegisterUser,
  selectUserError,
  selectUserStatus,
} from '../../features/user/userSlice'
import { ResponseStatus } from '../../types/API'
import { IRegisterUser } from '../../types/user'

// TODO: add validation
// TODO: add error handler
const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectUserStatus)
  const error = useAppSelector(selectUserError)

  const [formData, setFormData] = React.useState<IRegisterUser>({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = formData

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchRegisterUser(formData))
  }

  return (
    <div className="col-md-6 offset-md-3 col-xs-12">
      <h1 className="text-xs-center">Sign up</h1>
      <p className="text-xs-center">
        <a href="/">Have an account?</a>
      </p>
      <ul className="error-messages">
        {status === ResponseStatus.successed && <li>succeeded</li>}
        {status === ResponseStatus.failed && <li>error: {error}</li>}
      </ul>

      <form onSubmit={e => onFormSubmitted(e)}>
        <fieldset disabled={status === ResponseStatus.loading}>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="username"
              placeholder="Your Name"
              value={username}
              onChange={e => onInputChanged(e)}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => onInputChanged(e)}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => onInputChanged(e)}
            />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right">
            Sign Up
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default RegisterForm
