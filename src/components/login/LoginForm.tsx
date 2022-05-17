import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchLoginUser,
  selectUserError,
  selectUserStatus,
} from '../../features/user/userSlice'
import { ResponseStatus } from '../../types/API'
import { ILoginUser } from '../../types/user'

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
    <React.Fragment>
      <ul className="error-messages">
        {status === ResponseStatus.succeeded && <li>succeeded</li>}
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
    </React.Fragment>
  )
}

export default LoginForm
