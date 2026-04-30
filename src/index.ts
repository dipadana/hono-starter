import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { note } from './route/note.js'
import { user } from './route/user.js'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: "Backend is running" })
})

app.route('/note', note)
app.route('/user', user)


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
