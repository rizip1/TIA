// trim all values in post requests
// need to be added after bodyParser middleware
export default (req, res, next) => {
  if (req.body) {
    req.body = Object.keys(req.body).reduce((acc, key) => {
      if (req.body[key] && typeof req.body[key] === 'string') {
        acc[key] = req.body[key].trim()
      } else {
        acc[key] = req.body[key]
      }
      return acc
    }, {});
  }
  next()
}
