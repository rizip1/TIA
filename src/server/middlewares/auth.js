import {errorMessages} from '../errors'

export default (req, res, next) => {
  if (!req.session.email) {
    res.status(403).json({message: errorMessages.forbidden})
  } else {
    next()
  }
}
