import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ToDoItemCard from '../components/ToDoItemCard'
import styles from '../css/ToDoPage.module.css'
import { createTodo, getToDos, updateToDo } from '../services/ToDoService'
import type { TimerSetting, ToDo } from '../types/Type'
import AddTodoModal from '../components/AddTodoModal'
import { ArrowPathIcon } from '@heroicons/react/16/solid'

const ToDoPage = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [toDos, setToDos] = useState<ToDo[]>([])
  const [dragId, setDragId] = useState<number | null>(null)

  const timerSettings: Record<TimerSetting, number> = {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  }

  const [timerButton, setTimerButton] = useState<'Start' | 'Stop'>('Start')
  const [timerSetting, setTimerSetting] = useState<TimerSetting>('work')
  const [timerMinutes, setTimerMinutes] = useState<number | string>(
    timerSettings[timerSetting]
  )
  const [timerSeconds, setTimerSeconds] = useState<number | string>('00')
  const [intervalId, setIntervalId] = useState<number | null>(null)

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

  const handleDelete = (id: number) => {
    setToDos((prev) => prev.filter((t) => t.id !== id))
  }

  const handleDragStart = (id: number) => {
    setDragId(id)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
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

  const handleTimerSettings = (timerSetting: TimerSetting) => {
    setTimerSetting(timerSetting)

    switch (timerSetting) {
      case 'work':
        setTimerMinutes(timerSettings.work)
        break
      case 'shortBreak':
        setTimerMinutes(timerSettings.shortBreak)
        break
      case 'longBreak':
        setTimerMinutes(timerSettings.longBreak)
        break
    }
    setTimerSeconds('00')
  }

  const startTimer = () => {
    setTimerButton('Stop')

    const endTime = new Date().getTime() + Number(timerMinutes) * 60000

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime - now

      if (distance <= 0) {
        clearInterval(interval)
        setIntervalId(null)

        setTimerMinutes('00')
        return
      }

      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((distance % (1000 * 60)) / 1000)

      setTimerMinutes(m < 10 ? `0${m}` : m)
      setTimerSeconds(s < 10 ? `0${s}` : s)
    }, 1000)

    setIntervalId(interval)
  }

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }

    setTimerMinutes(timerSettings[timerSetting])
    setTimerSeconds('00')
    setTimerButton('Start')
  }

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setTimerButton('Start')
  }

  const handleTimerRun = () => {
    switch (timerButton) {
      case 'Start':
        startTimer()
        break
      case 'Stop':
        stopTimer()
        break
    }
  }

  return (
    <>
      <aside>
        <button onClick={handleLogout}>Log out</button>
      </aside>

      <main className={styles.toDoPageWrapper}>
        <div className={styles.timerWrapper}>
          <span className={styles.timerClock}>
            <span>{timerMinutes}</span>:<span>{timerSeconds}</span>
          </span>

          <div className={styles.timerButtonWrapper}>
            <button onClick={handleTimerRun}>{timerButton}</button>

            <button onClick={resetTimer} className={`iconButton`}>
              <ArrowPathIcon />
              <span className="sr-only">Reset</span>
            </button>
          </div>

          <div className={styles.timerSettingsWrapper}>
            <input
              type="radio"
              className="active"
              onChange={() => handleTimerSettings('work')}
              name="timerSetting"
              id="work"
              checked={timerSetting === 'work'}
            />
            <label htmlFor="work" className="button">
              Do it
            </label>

            <input
              type="radio"
              onChange={() => handleTimerSettings('shortBreak')}
              name="timerSetting"
              id="shortBreak"
            />
            <label htmlFor="shortBreak" className="button">
              Breathe
            </label>

            <input
              type="radio"
              onChange={() => handleTimerSettings('longBreak')}
              name="timerSetting"
              id="longBreak"
            />
            <label htmlFor="longBreak" className="button">
              Recover
            </label>
          </div>
        </div>

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

        <button onClick={handelOpen}>+</button>
        {open && (
          <AddTodoModal
            onClose={() => setOpen(false)}
            onCreate={handleCreateTodo}
          />
        )}
      </main>
    </>
  )
}

const getNewOrder = (prev?: number, next?: number) => {
  if (prev == null && next == null) return 1000
  if (prev == null) return next! - 1000
  if (next == null) return prev + 1000
  return (prev + next) / 2
}

export default ToDoPage
