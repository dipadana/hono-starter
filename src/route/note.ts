import { Hono } from 'hono'
import { nanoid } from 'nanoid'

const note = new Hono()

type NoteType = { id: string, note: string }

const notes: NoteType[] = []

note.get('/', (c) => {
  return c.json({
    message: "This route note",
    notes: notes
  })
})

note.get('/:id', (c) => {
  const param = c.req.param()

  const noteFound = notes.find((note) => note.id === param.id)

  if (noteFound) {
    return c.json({ ...noteFound })
  } else {
    return c.json({ error: 'Note not found' }, 404)
  }
})

note.post('/', async (c) => {
  const body = await c.req.json() as { note: string }
  notes.push({ id: nanoid(), ...body })
  return c.json({ message: "Your note save succesfuly" })
})

note.put('/:id', async (c) => {
  const body = await c.req.json() as { note: string }
  const param = c.req.param()

  const noteFound = notes.find((note) => note.id === param.id)

  if (noteFound) {
    noteFound.note = body.note
    return c.json({ message: "Your edited note save succesfuly" })
  } else {
    return c.json({ error: 'Note not found' }, 404)
  }
})

note.delete('/:id', async (c) => {
  const body = await c.req.json() as { note: string }
  const param = c.req.param()

  const noteIndex = notes.findIndex((note) => note.id === param.id)

  notes.splice(noteIndex, 1)

  return c.json({ message: "Your note succesfuly deleted" })
})

export default note
