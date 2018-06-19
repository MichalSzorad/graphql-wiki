import { PassportStatic } from 'passport'
import { localStrategy } from './strategies'
import { IUser, IDocUser } from '../users/models'

interface SetupPassportOptions {
  findUser(id: string): Promise<IDocUser | null | undefined>
}

function setupPassport(
  passport: PassportStatic,
  options: SetupPassportOptions,
) {
  const { findUser } = options

  passport.use('local', localStrategy)
  passport.serializeUser((user: IUser, done) => done(user._id))
  passport.deserializeUser((id: string, done) =>
    findUser(id)
      .then(user => done(null, user || undefined))
      .catch(done),
  )
}

export default setupPassport
