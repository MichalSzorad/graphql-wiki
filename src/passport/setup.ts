import { PassportStatic } from 'passport'
import { localStrategy } from './strategies'
import { IDocUser } from '../users/models'

interface SetupPassportOptions {
  findUser(id: string): Promise<IDocUser | null | undefined>
}

type Callback = (error: Error | null, data: any) => any

function serialize(user: IDocUser, done: Callback) {
  return done(null, user._id.toString())
}

function setupPassport(
  passport: PassportStatic,
  options: SetupPassportOptions,
) {
  const { findUser } = options

  passport.use(localStrategy)
  passport.serializeUser(serialize)
  passport.deserializeUser((id: string, done) =>
    findUser(id)
      .then(user => done(null, user || undefined))
      .catch(done),
  )
}

export default setupPassport
