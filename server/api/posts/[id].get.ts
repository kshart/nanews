interface Post {
  id: number
  userId: number
  title: string
  body: string
}
interface User {
  id: number
  username: string
  email: string
  name: string
  phone: string
  website: string
  address?: {
    city: string
    geo?: {
      lat: string
      lng: string
    }
    street: string
    suite: string
    zipcode: string
  }
  company?: {
    bs: string
    catchPhrase: string
    name: string
  }
}

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
