import { json } from 'express'
import { ApiFunction } from 'serve-my-app'

const api: ApiFunction = (app, server) => {
  app.use(json())

  app.get('/data', (req, res) => {
    res.json({ hello: 'world!' })
  })
}

export default api
