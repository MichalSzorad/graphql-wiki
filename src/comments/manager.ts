import { CommentModel, IDocComment } from './models'
import { save, findModelById, list, findModel } from '../db/adapter'
import { pubsub } from '../events'

interface ICommentParams {
  ownerId: string
  postId: string
  text: string
}

function subscribeCommentCreated(postId: string) {
  return pubsub.asyncIterator('commentAdded')
}

function createComment(params: ICommentParams) {
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
