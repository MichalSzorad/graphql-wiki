import {
  findPostById,
  createPost,
  getAllPosts,
  subscribePostCreated,
} from './manager'
import { IPost, IDocPost } from './models'
import { findUserById } from '../users/manager'
import { findCommentsByPost } from '../comments/manager'

interface AddPostParams {
  ownerId: string
  text: string
  title: string
}

interface IdParam {
  id: string
}

export interface PostMutation {
  addPost(args: AddPostParams): IPost
}

export interface PostQuery {
  post(args: IdParam): IPost
  posts(): IPost[]
}

export interface PostSubscription {
  postAdded(): IPost
}

export const resolver = {
  Mutation: {
    addPost(parentValue: any, args: any) {
      return createPost(args)
    },
  },
  Query: {
    post(parentValue: any, args: any) {
      return findPostById(args.id)
    },
    posts() {
      return getAllPosts()
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () => subscribePostCreated(),
    },
  },
  IPost: {
    owner(post: IDocPost) {
      return findUserById(post.ownerId)
    },
    comments(post: IDocPost) {
      return findCommentsByPost(post._id)
    },
  },
}
