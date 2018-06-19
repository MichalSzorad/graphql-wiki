import { CommentModel, IDocComment } from './models'
import {
  saveModel,
  findModelById,
  list,
  findModel,
  updateModelById,
} from '../db/adapter'
import { pubsub } from '../events'
import { validateComment } from './libs'

interface ICommentParams {
  ownerId: string
  postId: string
  text: string
}

interface IUpdateCommentParams {
  commentId: string
  text: string
}

interface ICommentOptions {
  validate?(data: ICommentParams): Promise<void>
}

function subscribeCommentCreated() {
  return pubsub.asyncIterator('commentAdded')
}

async function createComment(
  params: ICommentParams,
  options: ICommentOptions = {},
) {
  const { validate = validateComment } = options
  await validate(params)
  return saveModel(new CommentModel(params))
}

function findCommentById(id: string) {
  return findModelById<IDocComment>(CommentModel, id)
}

function getAllComments() {
  return list(CommentModel)
}

function findCommentsByPost(postId: string) {
  return findModel(CommentModel, { postId: { $eq: postId } })
}

function updateCommentText({ commentId, text }: IUpdateCommentParams) {
  return updateModelById(CommentModel, commentId, {
    textUpdatedAt: new Date(),
    text,
  })
}

export {
  createComment,
  findCommentById,
  findCommentsByPost,
  getAllComments,
  subscribeCommentCreated,
  updateCommentText,
}
