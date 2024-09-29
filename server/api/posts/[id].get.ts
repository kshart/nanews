export default defineCachedEventHandler(async (event) => {
  const db = useDB()
  const allUsers = await db.user.findAll()
  const allPosts = await db.post.findAll()

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
