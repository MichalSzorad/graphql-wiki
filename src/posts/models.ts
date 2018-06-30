import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'
import { IComment } from '../comments/models'

export interface IPost {
  _id: string
  comments: IComment[]
  createdAt: Date
  keywords: string[]
  owner: IUser
  text: string
  title: string
  updatedAt: Date
}

export interface IDocPost extends Document {
  _id: string
  createdAt: Date
  keywords: string[]
  ownerId: string
  text: string
  title: string
  updatedAt: Date
}

const postSchema = new mongoose.Schema(
  {
    keywords: [String],
    ownerId: String,
    text: String,
    title: String,
  },
  {
    timestamps: true,
  },
)

export const PostModel: Model<IDocPost> = mongoose.model('Post', postSchema)
