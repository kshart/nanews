import type { Post, User } from '@/types/models'

export default defineCachedEventHandler(async (event) => {
  const allPostsFetch = $fetch('https://jsonplaceholder.typicode.com/posts')
  const allUsersFetch = $fetch('https://jsonplaceholder.typicode.com/users')
  const allUsers = await allUsersFetch as User[]
  const allPosts = await allPostsFetch as Post[]
  const userMap = new Map()

  for (const user of allUsers) {
    userMap.set(user.id, user)
  }
  const id = Number(event.context.params?.id)
  const post = allPosts.find(p => p.id === id)
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
    })
  }
  return {
    ...post,
    user: userMap.get(post.userId),
  }
}, { maxAge: 60 * 60 })
