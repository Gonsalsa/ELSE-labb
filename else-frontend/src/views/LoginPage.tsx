import { Fragment, useState } from 'react'
import type { LoginInputField, User } from '../types/Type'
import styles from '../css/LoginPage.module.css'
import GetUsers from '../services/UserService'
import { useNavigate } from 'react-router'
import Logo from '../components/Logo'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const users = await GetUsers()

    const foundUser = users.find(
      (user: User) => user.username === username && user.password === password
    )
    if (foundUser) {
      setMessage('login successful')
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      navigate('/')
    } else {
      setMessage('wrong username or password')
    }
  }

  const inputs: LoginInputField[] = [
    {
      label: 'Username',
      value: username,
      onChange: (e) => setUsername(e.target.value),
      name: 'username',
    },
    {
      label: 'Password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      name: 'password',
    },
  ]

  return (
    <main className={styles.LoginPageWrapper}>
      <h1 className={styles.loginHeader}>
        <Logo />
      </h1>

      <form onSubmit={handleLogin} className={styles.loginForm}>
        {inputs.map(({ label, value, onChange, name }) => (
          <Fragment key={name}>
            <label className="sr-only" id="username">
              {label}
            </label>
            <input
              className={styles.loginInput}
              value={value}
              onChange={onChange}
              name={name}
              placeholder={label}
            />
          </Fragment>
        ))}

        <button type="submit">Login</button>
        {message && <p className={styles.ErrorMessage}>{message}</p>}
      </form>
    </main>
  )
}
export default LoginPage
