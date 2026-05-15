import type { User } from '../types/Type'

const baseUrl = import.meta.env.VITE_API_URL

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${baseUrl}/user`)
    if (!response.ok) {
      throw new Error("Couldn't find users!")
    }
    const users: User[] = await response.json()
    return users
  } catch (error) {
    console.error('Error fetching users', error)
    return []
  }
}

export default getUsers
