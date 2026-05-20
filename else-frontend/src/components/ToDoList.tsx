import { useState } from 'react'
import styles from '../css/ToDoPage.module.css'
import type { ToDo } from '../types/Type'
import ToDoItemCard from './ToDoItemCard'
import { PlusCircleIcon } from '@heroicons/react/16/solid'
import AddTodoModal from './AddTodoModal'
import { createTodo, updateToDo } from '../services/ToDoService'

const ToDoList = ({
  toDos,
  setToDos,
  loadTodos,
}: {
  toDos: ToDo[]
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>
  loadTodos: () => Promise<void>
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [dragId, setDragId] = useState<number | null>(null)

  const hasTodos = toDos.length > 0

  const handleDelete = (id: number) => {
    setToDos((prev) => prev.filter((t) => t.id !== id))
  }

  const getNewOrder = (prev?: number, next?: number) => {
    if (prev == null && next == null) return 1000
    if (prev == null) return next! - 1000
    if (next == null) return prev + 1000
    return (prev + next) / 2
  }

  const handleDragStart = (id: number) => {
    setDragId(id)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const handleDrop = async (toIndex: number) => {
    if (dragId == null) return

    const sorted = [...toDos].sort((a, b) => a.order - b.order)

    const fromIndex = sorted.findIndex((t) => t.id === dragId)
    if (fromIndex === -1) return

    const updated = [...sorted]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)

    const prevItem = updated[toIndex - 1]
    const nextItem = updated[toIndex + 1]

    const newOrder = getNewOrder(prevItem?.order, nextItem?.order)

    const updatedMoved = {
      ...moved,
      order: newOrder,
    }

    updated[toIndex] = updatedMoved

    setToDos(updated)

    await updateToDo(moved.id, {
      title: moved.title,
      isCompleted: moved.isCompleted,
      order: newOrder,
    })

    setDragId(null)
  }

  const handelOpen = () => {
    setOpen(true)
  }

  const handleCreateTodo = async (title: string) => {
    const newTodo = await createTodo(title)

    if (newTodo) {
      await loadTodos()
      setOpen(false)
    }
  }

  return (
    <>
      <div className={styles.toDoListWrapper}>
        <div className={styles.toDoListRail}>
          {hasTodos && (
            <ul className={styles.toDoList}>
              {toDos.map((toDoItem, index) => (
                <li
                  key={toDoItem.id}
                  draggable
                  onDragStart={() => handleDragStart(toDoItem.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  <ToDoItemCard {...toDoItem} onDelete={handleDelete} />
                </li>
              ))}
            </ul>
          )}

          <div className={styles.addButtonOverlay}>
            {!hasTodos && (
              <>
                <p>
                  There's always something to do.
                  <br />
                  Let's add som tasks!
                </p>
              </>
            )}
            <button
              onClick={handelOpen}
              className={`iconButton ${styles.addButton}`}
            >
              <PlusCircleIcon />
            </button>
          </div>
        </div>
      </div>

      <AddTodoModal
        onCreate={handleCreateTodo}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  )
}

export default ToDoList
