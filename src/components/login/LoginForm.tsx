import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchLoginUser,
  selectUserError,
  selectUserStatus,
} from '../../features/user/userSlice'
import { ResponseStatus } from '../../types/API'
import { ILoginUser } from '../../types/user'

// TODO: add validation
// TODO: add error handler
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectUserStatus)
  const error = useAppSelector(selectUserError)

  const [formData, setFormData] = React.useState<ILoginUser>({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchLoginUser(formData))
  }

  return (
    <div className="col-md-6 offset-md-3 col-xs-12">
      <h1 className="text-xs-center">Sign in</h1>
      <p className="text-xs-center">
        <a href="/">Need an account?</a>
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
            Sign in
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default LoginForm
