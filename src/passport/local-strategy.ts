import { Strategy } from 'passport-local'
import { authenticate } from '../users/manager'

const localStrategy = new Strategy((username, password, done) => {
  authenticate({ email: username, password })
    .then(user => {
      if (!user) {
        return done(null, false)
      }

      return done(null, user)
    })
    .catch(done)
})

export default localStrategy
