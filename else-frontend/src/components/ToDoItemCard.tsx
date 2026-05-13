import { useEffect, useState } from 'react'
import type { ToDo } from '../types/Type'
import styles from '../css/ToDoPage.module.css'

const ToDoItemCard = ({ id, title, isCompleted }: ToDo) => {
  const [status, setStatus] = useState(isCompleted)

  useEffect(() => {}, [status])

  return (
    <div className={styles.toDoCard}>
      <h3>{title}</h3>
      <input
        type="checkbox"
        name={`${id}`}
        id={`${id}`}
        checked={status}
        onChange={() => setStatus(!status)}
      />
      <button>Delete</button>
    </div>
  )
}

export default ToDoItemCard
