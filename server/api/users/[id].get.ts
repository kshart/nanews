export default defineCachedEventHandler(async (event) => {
  const db = useDB()
  const allUsers = await db.user.findAll()
  const id = Number(event.context.params?.id)

  for (const user of allUsers) {
    if (user.id === id) {
      return user
    }
  }
  throw createError({
    statusCode: 404,
    statusMessage: 'Not found',
  })
}, { maxAge: 60 * 60 })
