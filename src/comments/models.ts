import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'
import { IPost } from '../posts/models'

export interface IComment {
  _id: string
  owner: IUser
  post: IPost
  text: string
}

export interface IDocComment extends Document {
  ownerId: string
  postId: string
  text: string
}

const commentSchema = new mongoose.Schema({
  ownerId: String,
  postId: String,
  text: String,
})

export const CommentModel: Model<IDocComment> = mongoose.model(
  'Comment',
  commentSchema,
)
