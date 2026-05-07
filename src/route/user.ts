import { Hono } from 'hono'

const user = new Hono()

user.get('/', (c) => {
  return c.json({ message: "This route user" })
})

export default user
