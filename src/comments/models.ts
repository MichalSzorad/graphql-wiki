import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'
import { IPost } from '../posts/models'

export interface IComment {
  _id: string
  createdAt: Date
  owner: IUser
  post: IPost
  text: string
  updatedAt: Date
}

export interface IDocComment extends Document {
  createdAt: Date
  ownerId: string
  postId: string
  text: string
  updatedAt: Date
}

const commentSchema = new mongoose.Schema(
  {
    ownerId: String,
    postId: String,
    text: String,
  },
  {
    timestamps: true,
  },
)

export const CommentModel: Model<IDocComment> = mongoose.model(
  'Comment',
  commentSchema,
)
