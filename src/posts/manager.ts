import { PostModel } from './models'
import { saveModel, findModel, findModelById, modelExists } from '../db/adapter'
import { pubsub } from '../events'
import { validatePost } from './lib'

interface IPostParams {
  ownerId: string
  text: string
  title: string
  keywords: string[]
}

interface CreatePostOptions {
  validate?(params: IPostParams): Promise<void>
}

function subscribePostCreated() {
  return pubsub.asyncIterator('postAdded')
}

async function createPost(
  params: IPostParams,
  options: CreatePostOptions = {},
) {
  const { validate = validatePost } = options
  await validate(params)
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

function findPostsByKeywords(keywords: string[]) {
  return findModel(PostModel, {
    keywords: { $all: keywords },
  })
}

export {
  createPost,
  findPostById,
  getAllPosts,
  postExists,
  subscribePostCreated,
  findPostsByKeywords,
}
