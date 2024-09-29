export default defineEventHandler(async () => {
  const db = useDB()
  return await db.user.findAll()
})
