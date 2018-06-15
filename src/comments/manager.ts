import { CommentModel, IDocComment } from './models'
import { save, findModelById, list, findModel } from '../db/adapter'

interface ICommentParams {
  ownerId: string
  postId: string
  text: string
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

export { createComment, findCommentById, getAllComments, findCommentsByPost }
