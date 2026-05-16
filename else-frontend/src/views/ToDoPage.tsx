import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Timer from '../components/Timer'
import ToDoList from '../components/ToDoList'
import styles from '../css/ToDoPage.module.css'
import { getToDos } from '../services/ToDoService'
import type { ToDo } from '../types/Type'

const ToDoPage = () => {
  const navigate = useNavigate()
  const [toDos, setToDos] = useState<ToDo[]>([])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  const loadTodos = async () => {
    const data = await getToDos()
    setToDos(data)
  }

  useEffect(() => {
    const initToDos = async () => {
      loadTodos()
    }

    initToDos()
  }, [])

  return (
    <>
      <aside>
        <button onClick={handleLogout}>Log out</button>
      </aside>

      <main className={styles.toDoPageWrapper}>
        <Timer />
        <ToDoList toDos={toDos} setToDos={setToDos} loadTodos={loadTodos} />
      </main>
    </>
  )
}

export default ToDoPage
