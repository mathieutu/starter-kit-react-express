import { Express, json } from 'express'

export default (app: Express) => {
  app.use(json());

  app.get('/data', (req, res) => {
    res.json({hello: 'world!'});
  });
};
