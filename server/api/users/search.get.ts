import type { User } from '@/types/models'

export default defineEventHandler(async () => {
  const allUsers = await $fetch('https://jsonplaceholder.typicode.com/users') as User[]

  return allUsers
})
