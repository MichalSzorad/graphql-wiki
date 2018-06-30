import { Strategy as LocalStrategy } from 'passport-local'
import { authenticate } from '../users/manager'

const localStrategy = new LocalStrategy((username, password, done) => {
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
