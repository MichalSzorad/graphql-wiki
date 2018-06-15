import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'

export interface IComment {
  _id: string
  text: string
  owner: IUser
}

export interface IDocComment extends Document {
  text: string
  ownerId: string
}

const commentSchema = new mongoose.Schema({
  text: String,
  ownerId: String,
})

export const CommentModel: Model<IDocComment> = mongoose.model(
  'Comment',
  commentSchema,
)
