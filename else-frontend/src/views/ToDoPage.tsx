import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ToDoItemCard from '../components/ToDoItemCard'
import styles from '../css/ToDoPage.module.css'
import { getToDos } from '../services/ToDoService'
import type { ToDo } from '../types/Type'

const ToDoPage = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }
  const [toDo, setToDo] = useState<ToDo[]>([])

  useEffect(() => {
    const GetToDoList = async () => {
      const toDo = await getToDos()
      setToDo(toDo)
    }

    GetToDoList()
  }, [])

  const handleDelete = (id: number) => {
    setToDo((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      <aside>
        <button onClick={() => handleLogout()}>Log out</button>
      </aside>

      <main>
        <ul className={styles.toDoList}>
          {toDo.map((toDoItem) => (
            <li key={toDoItem.id}>
              <ToDoItemCard {...toDoItem} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default ToDoPage
