import { CommentModel, IDocComment } from './models'
import { save, findModelById, list } from '../db/adapter'

interface ICommentParams {
  text: string
  ownerId: string
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
export { createComment, findCommentById, getAllComments }
