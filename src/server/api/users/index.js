import express from 'express'

const router = express.Router()

router.post('/',
  (req, res) => {
    res.status(201).send('User created')
  }
)

router.put('/',
  (req, res) => {
    res.status(200).send('Profile updated')
  }
)

router.delete('/',
  (req, res) => {
    res.status(200).send('User deleted')
  }
)

export default router
