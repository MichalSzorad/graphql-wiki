import { findPostById, createPost, getAllPosts } from './manager'
import { IPost } from './models'
import { findUserById } from '../users/manager'

interface AddPostParams {
  title: string
  text: string
  ownerId: string
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
  IPost: {
    owner(post: any) {
      return findUserById(post.ownerId)
    },
  },
}
