import { useNavigate } from 'react-router'
import GetToDos from '../services/ToDoService'
import { useEffect, useState } from 'react'
import type { ToDo } from '../types/Type'
import ToDoItemCard from '../components/ToDoItemCard'
import styles from '../css/ToDoPage.module.css'

const ToDoPage = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }
  const [toDo, setToDo] = useState<ToDo[]>([])

  useEffect(() => {
    const GetToDoList = async () => {
      const toDo = await GetToDos()
      setToDo(toDo)
    }

    GetToDoList()
  }, [])

  return (
    <>
      <aside>
        <button onClick={() => handleLogout()}>Log out</button>
      </aside>

      <main>
        <ul className={styles.toDoList}>
          {toDo.map((toDoItem) => (
            <li>
              <ToDoItemCard {...toDoItem} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default ToDoPage
