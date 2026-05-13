import type { ToDo } from '../types/Type'

const baseUrl = import.meta.env.VITE_API_URL

async function GetToDos(): Promise<ToDo[]> {
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

export default GetToDos
