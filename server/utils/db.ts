import type { Post, User } from '@/types/models'

const allPostsFetch = $fetch('https://jsonplaceholder.typicode.com/posts')
const allUsersFetch = $fetch('https://jsonplaceholder.typicode.com/users')

export function useDB () {
  return {
    post: {
      async findAll () {
        return await allPostsFetch as Post[]
      }
    },
    user: {
      async findAll () {
        return await allUsersFetch as User[]
      }
    }
  }
}
