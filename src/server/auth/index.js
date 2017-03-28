import express from 'express'

const router = express.Router()

router.post('/login',
  (req, res) => {
    res.status(200).send('Login')
  }
)

router.get('/logout',
  (req, res) => {
    res.status(200).send('Logout')
  }
)

export default router
