import { userExists } from '../users/manager'
import { postExists } from '../posts/manager'

import { FieldRequiredError } from './errors'

interface ICommentParams {
  ownerId: string
  postId: string
}

interface ICommentOptions {
  checkUserExistence?(id: String): Promise<boolean>
  checkPostExistence?(id: String): Promise<boolean>
}

export async function validateComment(
  params: ICommentParams,
  options: ICommentOptions = {},
): Promise<void> {
  const { ownerId, postId } = params
  const {
    checkPostExistence = postExists,
    checkUserExistence = userExists,
  } = options

  if (!(await checkUserExistence(ownerId))) {
    throw new FieldRequiredError({
      data: {
        details: 'An owner needs to exist',
      },
    })
  }

  if (!(await checkPostExistence(postId))) {
    throw new FieldRequiredError({
      data: {
        details: 'Post needs to exist',
      },
    })
  }
}
