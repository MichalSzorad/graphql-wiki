import { createUser } from '../manager'
import { IDocUser, UserModel } from '../models'

const validUserParams = {
  displayName: 'test',
  email: 'foo@bar.com',
  password: 'foo',
}

const createMocks = () => {
  return {
    save: jest
      .fn()
      .mockReturnValue(Promise.resolve(new UserModel(validUserParams))),
  }
}

describe('createUser', () => {
  it('Should not crash', async () => {
    const { save } = createMocks()
    await createUser(validUserParams, { save })
  })

  it('Should hash the password', async () => {
    const { save } = createMocks()
    await createUser(validUserParams, { save })
    expect(save.mock.calls.length).toBe(1)
    expect(save.mock.calls[0][0].password).not.toBe(validUserParams.password)
  })

  it('Should not modify displayName', async () => {
    const { save } = createMocks()
    await createUser(validUserParams, { save })
    expect(save.mock.calls.length).toBe(1)
    expect(save.mock.calls[0][0].displayName).toBe(validUserParams.displayName)
  })
})
