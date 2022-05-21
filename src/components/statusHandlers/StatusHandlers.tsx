import { ResponseError } from '../../types/API'

interface ErrorProps {
  error: ResponseError | string
}
export const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="error-messages" style={{ padding: '1.5rem 0' }}>
      <p>There was an error:</p>
      <pre>{error}</pre>
    </div>
  )
}

interface LoadingProps {
  title: string
}
export const Loading: React.FC<LoadingProps> = ({ title }) => {
  return <div style={{ padding: '1.5rem 0' }}>Loading {title}...</div>
}

interface MessageProps {
  title: string
}
export const Message: React.FC<MessageProps> = ({ title }) => {
  return <div style={{ padding: '1.5rem 0' }}>{title}</div>
}
