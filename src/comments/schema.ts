import { withFilter } from 'graphql-subscriptions'
import {
  findCommentById,
  createComment,
  getAllComments,
  subscribeCommentCreated,
  updateCommentText,
} from './manager'
import { IComment, IDocComment } from './models'
import { findUserById } from '../users/manager'
import { findPostById } from '../posts/manager'

interface AddCommentParams {
  text: string
  ownerId: string
  postId: string
  parentId: string
}

interface UpdateCommentParams {
  text: string
  commentId: string
}

interface IdParam {
  id: string
}

interface PostIdParam {
  postId: string
}

export interface CommentMutation {
  addComment(args: AddCommentParams): IComment
  updateComment(args: UpdateCommentParams): IComment
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
    updateComment: (parentValue: any, args: any) => updateCommentText(args),
  },
  Query: {
    comment: (parentValue: any, args: any) => findCommentById(args.id),
    comments: () => getAllComments(),
  },

  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => subscribeCommentCreated(),
        (payload, vars) => payload.commentAdded.postId === vars.postId,
      ),
    },
  },

  IComment: {
    owner: (comment: IDocComment) => findUserById(comment.ownerId),
    post: (comment: IDocComment) => findPostById(comment.postId),
    parent: (comment: IDocComment) =>
      comment.parentId ? findCommentById(comment.parentId) : null,
  },
}
