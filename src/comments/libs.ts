import { userExists } from '../users/manager'
import { postExists } from '../posts/manager'

import { FieldRequiredError } from './errors'
import { findCommentById } from './manager'

interface ICommentParams {
  ownerId: string
  postId: string
  parentId?: string
}

interface ICommentOptions {
  checkUserExistence?(id: String): Promise<boolean>
  checkPostExistence?(id: String): Promise<boolean>
}

export async function validateComment(
  params: ICommentParams,
  options: ICommentOptions = {},
): Promise<void> {
  const { ownerId, postId, parentId } = params
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

  if (typeof parentId === 'string') {
    const comment = await findCommentById(parentId)
    if (!comment || comment.postId !== postId) {
      throw new FieldRequiredError({
        data: {
          details:
            'Parent comment must exist and must have the same postId. Do not pass parentId if you want.',
        },
      })
    }
  }
}
