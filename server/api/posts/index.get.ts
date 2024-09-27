import type { Paginator, PaginatorQuery } from '@/types/paginator'
import type { Post, User } from '@/types/models'

interface PostsGetQuery extends PaginatorQuery {
  fts?: string
  userId?: string
}

export default defineCachedEventHandler(async (event) => {
  const query = getQuery<PostsGetQuery>(event)
  const perPage = Number(query.perPage || 30)
  const page = Number(query.page || 0)

  const allPostsFetch = $fetch('https://jsonplaceholder.typicode.com/posts')
  const allUsersFetch = $fetch('https://jsonplaceholder.typicode.com/users')
  const allUsers = await allUsersFetch as User[]
  let allPosts = await allPostsFetch as Post[]
  const userMap = new Map()

  for (const user of allUsers) {
    userMap.set(user.id, user)
  }

  if (query.userId) {
    const userId = Number(query.userId)
    allPosts = allPosts.filter(p => p.userId === userId)
  }

  if (query.fts) {
    const fts = String(query.fts).toLowerCase()
    allPosts = allPosts.filter(p => p.title.toLowerCase().indexOf(fts) >= 0 || p.body.toLowerCase().indexOf(fts) >= 0)
  }

  return {
    page,
    perPage,
    total: allPosts.length,
    totalPages: Math.ceil(allPosts.length / perPage),
    data: allPosts.slice(perPage * page, perPage * (page + 1)).map(p => {
      return {
        ...p,
        user: userMap.get(p.userId),
      }
    }),
  }
} /* , { maxAge: 60 * 60 } */)
