import { createBrowserRouter, redirect } from 'react-router'
import App from './App'
import ErrorPage from './views/ErrorPage'
import LoginPage from './views/LoginPage'
import NotFound from './views/NotFound'
import ToDoPage from './views/ToDoPage'

const authLoader = () => {
  const currentUser = localStorage.getItem('currentUser')
  if (!currentUser) return redirect('/login')

  return null
}

export const router = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    HydrateFallback: () => <p>Loading...</p>,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <ToDoPage /> }],
  },
  {
    path: '/login',
    HydrateFallback: () => <p>Loading...</p>,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
