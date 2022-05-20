import { AxiosResponse } from 'axios'
import * as React from 'react'

type InitialState<D> = {
  data?: D | null
  status?: string
  error?: string | null
}

type DefaultState<D> = {
  data: D | null
  status: string
  error: string | null
}

function useAsync<T>(initialState?: InitialState<T>) {
  const [state, dispatch] = React.useReducer(
    (s: typeof initialState, a: DefaultState<T>) => ({ ...s, ...a }),
    {
      data: null,
      status: 'idle',
      error: null,
      ...initialState,
    } as DefaultState<T>,
  )

  const { data, error, status } = state

  const setData = React.useCallback(
    (data: T) => dispatch({ data, status: 'fulfilled', error: null }),
    [dispatch],
  )
  const setError = React.useCallback(
    (error: string | null) =>
      dispatch({ data: null, status: 'rejected', error }),
    [dispatch],
  )

  const run = React.useCallback(
    (promise: Promise<AxiosResponse<T, any>>) => {
      dispatch({ data: null, status: 'pending', error: null })

      // Promise {<pending>}
      return promise.then(
        // fulfilled
        (response: AxiosResponse<T, any>) => {
          setData(response.data)
          return response.data
        },
        // rejected
        (error: string | null) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [dispatch, setData, setError],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'fulfilled',

    error,
    status,
    data,
    run,
  }
}

export { useAsync }
