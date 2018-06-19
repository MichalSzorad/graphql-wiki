import { userExists } from '../users/manager'
import { FieldRequiredError } from './errors'

interface IPostParams {
  ownerId: string
}

interface IPostOptions {
  checkUserExistence?(id: String): Promise<boolean>
}

export async function validatePost(
  params: IPostParams,
  options: IPostOptions = {},
): Promise<void> {
  const { ownerId } = params
  const { checkUserExistence = userExists } = options
  if (!(await checkUserExistence(ownerId))) {
    throw new FieldRequiredError({
      data: {
        details: 'Owner needs to exist',
      },
    })
  }
}
