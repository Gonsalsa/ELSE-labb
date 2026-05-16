import { useState } from 'react'
import styles from '../css/ToDoPage.module.css'
import type { TimerSetting } from '../types/Type'
import { ArrowPathIcon } from '@heroicons/react/16/solid'

const Timer = () => {
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
  )
}

export default Timer
