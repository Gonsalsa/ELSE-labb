import { useEffect, useState } from 'react'
import type { ToDo } from '../types/Type'
import styles from '../css/ToDoPage.module.css'

const ToDoItemCard = ({ id, title, isCompleted }: ToDo) => {
  const [status, setStatus] = useState(isCompleted)

  useEffect(() => {}, [status])

  return (
    <div className={styles.toDoCard}>
      <div className={styles.rail}>
        <input
          type="checkbox"
          name={title}
          id={`${id}`}
          checked={status}
          onChange={() => setStatus(!status)}
        />
        <label htmlFor={`${id}`}>{title}</label>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default ToDoItemCard
