import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'
import { IPost } from '../posts/models'

export interface IComment {
  _id: string
  text: string
  owner: IUser
  post: IPost
}

export interface IDocComment extends Document {
  text: string
  ownerId: string
  postId: string
}

const commentSchema = new mongoose.Schema({
  text: String,
  ownerId: String,
  postId: String,
})

export const CommentModel: Model<IDocComment> = mongoose.model(
  'Comment',
  commentSchema,
)
