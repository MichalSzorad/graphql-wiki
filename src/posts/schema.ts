import {
  findPostById,
  createPost,
  getAllPosts,
  subscribePostCreated,
  findPostsByKeywords,
} from './manager'
import { IPost, IDocPost } from './models'
import { findUserById } from '../users/manager'
import { findCommentsByPost } from '../comments/manager'

interface AddPostParams {
  ownerId: string
  text: string
  title: string
  keywords: string[]
}

interface IdParam {
  id: string
}

interface IFindByKeyword {
  keyword: string
}

export interface PostMutation {
  addPost(args: AddPostParams): IPost
}

export interface PostQuery {
  post(args: IdParam): IPost
  posts(): IPost[]
  findPostsByKeyword(args: IFindByKeyword): IPost[]
}

export interface PostSubscription {
  postAdded(): IPost
}

export const resolver = {
  Mutation: {
    addPost: (parentValue: any, args: any) => createPost(args),
  },
  Query: {
    post: (parentValue: any, args: any) => findPostById(args.id),
    posts: () => getAllPosts(),
    findPostsByKeyword: (parentValue: any, args: any) =>
      findPostsByKeywords([args.keyword]),
  },
  Subscription: {
    postAdded: {
      subscribe: () => subscribePostCreated(),
    },
  },
  IPost: {
    owner: (post: IDocPost) => findUserById(post.ownerId),
    comments: (post: IDocPost) => findCommentsByPost(post._id),
  },
}
