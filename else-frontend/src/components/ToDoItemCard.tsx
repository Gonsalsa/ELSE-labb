import { TrashIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import styles from '../css/ToDoPage.module.css'
import { deleteToDo, updateToDo } from '../services/ToDoService'
import type { ToDo } from '../types/Type'

const ToDoItemCard = ({
  id,
  title: ogTitle,
  isCompleted: ogIsCompleted,
  onDelete,
}: ToDo & {
  onDelete: (id: number) => void
}) => {
  const [title, setTitle] = useState(ogTitle)
  const [isCompleted, setIsCompleted] = useState(ogIsCompleted)

  const update = async (updated: { title?: string; isCompleted?: boolean }) => {
    await updateToDo(id, {
      title: updated.title ?? title,
      isCompleted: updated.isCompleted ?? isCompleted,
    })
  }

  const saveTitle = async () => {
    if (title !== ogTitle) {
      await update({ title })
    }
  }

  const handleTitleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      saveTitle()
      e.currentTarget.blur()
    }
  }

  const handleStatusChange = async () => {
    const newStatus = !isCompleted
    setIsCompleted(newStatus)
    await update({ isCompleted: newStatus })
  }

  const handleDelete = async () => {
    await deleteToDo(id)
    onDelete(id)
  }

  return (
    <div className={styles.toDoCardWrapper}>
      <div className={styles.rail}>
        <div className={styles.toDoCard}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            onBlur={saveTitle}
            onKeyDown={(e) => handleTitleKeyDown(e)}
          />

          <input
            type="checkbox"
            name={title}
            id={`${id}`}
            checked={isCompleted}
            onChange={handleStatusChange}
          />

          <label htmlFor={`${id}`}>
            <span className="sr-only">Is completed</span>
          </label>
        </div>

        <button
          className={`iconButton ${styles.deleteButton}`}
          onClick={handleDelete}
        >
          <TrashIcon />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </div>
  )
}

export default ToDoItemCard
