import { useEffect, useRef, useState } from 'react'
import styles from '../css/ToDoPage.module.css'

type AddTodoProps = {
  onCreate: (title: string) => void
  onClose: () => void
  open: boolean
}

const AddTodoModal = ({ onCreate, onClose, open }: AddTodoProps) => {
  const [title, setTitle] = useState<string>('')
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  const handleSave = () => {
    if (!title.trim()) return
    onCreate(title)
    setTitle('')
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }

    if (e.key === 'Enter') {
      handleSave()
    }
  }

  if (!open) return null

  return (
    <>
      {open && (
        <dialog
          ref={dialogRef}
          className={`overlay`}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
        >
          <div
            className={styles.addTodoCard}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              placeholder="Add new task"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div>
              <button onClick={handleSave}>save</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}

export default AddTodoModal
