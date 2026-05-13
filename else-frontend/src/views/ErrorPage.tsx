import { useRouteError } from 'react-router'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>{JSON.stringify(error)}</i>
    </div>
  )
}

export default ErrorPage
