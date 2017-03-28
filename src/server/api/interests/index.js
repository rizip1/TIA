import express from 'express'

const router = express.Router()

router.post('/',
  (req, res) => {
    res.status(201).send('Interest created')
  }
)

router.delete('/',
  (req, res) => {
    res.status(200).send('Interest deleted')
  }
)

export default router
