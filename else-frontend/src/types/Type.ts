export type User = {
  id: number
  username: string
  password: string
}

export type ToDo = {
  id: number
  title: string
  isCompleted: boolean
  order: number
}

export type LoginInputField = {
  label: string
  name: 'username' | 'password'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export type TimerSetting = 'work' | 'shortBreak' | 'longBreak'
