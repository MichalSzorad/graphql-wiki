import { findCommentById, createComment, getAllComments } from './manager'
import { IComment } from './models'
import { findUserById } from '../users/manager'

interface AddCommentParams {
  text: string
  ownerId: string
}

interface IdParam {
  id: string
}

export interface CommentMutation {
  addComment(args: AddCommentParams): IComment
}

export interface CommentQuery {
  comment(args: IdParam): IComment
  comments: IComment[]
}

export const resolver = {
  Mutation: {
    addComment(parentValue: any, args: any) {
      return createComment(args)
    },
  },
  Query: {
    comment(parentValue: any, args: any) {
      return findCommentById(args.id)
    },
    comments() {
      return getAllComments()
    },
  },

  IComment: {
    owner(comment: any) {
      return findUserById(comment.ownerId)
    },
  },
}
