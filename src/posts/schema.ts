import { findPostById, createPost } from './manager'
import { IPost } from './models'

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
}

export const resolver = {
  Mutation: {
    Post: {
      addPost(parentValue: any, args: any) {
        return createPost(args)
      },
    },
  },
  Query: {
    Post: {
      post(parentValue: any, args: any) {
        return findPostById(args.id)
      },
    },
  },
}
