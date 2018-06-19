import { withFilter } from 'graphql-subscriptions'
import {
  findCommentById,
  createComment,
  getAllComments,
  subscribeCommentCreated,
} from './manager'
import { IComment, IDocComment } from './models'
import { findUserById } from '../users/manager'
import { findPostById } from '../posts/manager'

interface AddCommentParams {
  text: string
  ownerId: string
  postId: string
}

interface IdParam {
  id: string
}

interface PostIdParam {
  postId: string
}

export interface CommentMutation {
  addComment(args: AddCommentParams): IComment
}

export interface CommentQuery {
  comment(args: IdParam): IComment
  comments: IComment[]
}

export interface CommentSubscription {
  commentAdded(args: PostIdParam): IComment
}

export const resolver = {
  Mutation: {
    addComment: (parentValue: any, args: any) => createComment(args),
  },
  Query: {
    comment: (parentValue: any, args: any) => findCommentById(args.id),
    comments: () => getAllComments(),
  },

  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => subscribeCommentCreated(),
        (payload, vars) => {
          return payload.commentAdded.postId === vars.postId
        },
      ),
    },
  },

  IComment: {
    owner: (comment: IDocComment) => findUserById(comment.ownerId),
    post: (comment: IDocComment) => findPostById(comment.postId),
  },
}
