import { CommentModel, IDocComment } from './models'
import { save, findModelById, list, findModel } from '../db/adapter'
import { pubsub } from '../events'
import { validateComment } from './libs'

interface ICommentParams {
  ownerId: string
  postId: string
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
  return save(new CommentModel(params))
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

export {
  createComment,
  findCommentById,
  findCommentsByPost,
  getAllComments,
  subscribeCommentCreated,
}
