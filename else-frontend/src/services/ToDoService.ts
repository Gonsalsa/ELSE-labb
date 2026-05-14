import type { ToDo } from '../types/Type'

const baseUrl = import.meta.env.VITE_API_URL

export const getToDos = async (): Promise<ToDo[]> => {
  try {
    const response = await fetch(`${baseUrl}/todo`)
    if (!response.ok) {
      throw new Error("Couldn't find any to do items!")
    }
    const toDo: ToDo[] = await response.json()
    return toDo
  } catch (error) {
    console.error('Error fetching to do items', error)
    return []
  }
}

export const updateToDo = async (
  id: number,
  todo: {
    title: string
    isCompleted: boolean
    order?: number
  }
) => {
  try {
    const response = await fetch(`${baseUrl}/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(todo),
    })

    console.log(todo)

    if (!response.ok) {
      throw new Error(`PUT failed: ${response.status}`)
    }
  } catch (error) {
    console.error(`PUT JSON error`, error)
  }
}

export const deleteToDo = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/todo/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`DELETE failed: ${response.status}`)
  }
}
