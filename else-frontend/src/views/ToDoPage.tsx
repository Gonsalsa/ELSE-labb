import { useNavigate } from 'react-router'

const ToDoPage = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <>
      <div>To Do Page</div>
      <button onClick={() => handleLogout()}>Log out</button>
    </>
  )
}

export default ToDoPage
