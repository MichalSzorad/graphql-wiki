import { PostModel } from './models'
import { saveModel, findModel, findModelById, modelExists } from '../db/adapter'
import { pubsub } from '../events'

interface IPostParams {
  ownerId: string
  text: string
  title: string
}

function subscribePostCreated() {
  return pubsub.asyncIterator('postAdded')
}

function createPost(params: IPostParams) {
  return saveModel(new PostModel(params))
}

function findPostById(id: string) {
  return findModelById(PostModel, id)
}

function getAllPosts() {
  return findModel(PostModel, {})
}

function postExists(id: string) {
  return modelExists(PostModel, id)
}

export {
  createPost,
  findPostById,
  getAllPosts,
  postExists,
  subscribePostCreated,
}
