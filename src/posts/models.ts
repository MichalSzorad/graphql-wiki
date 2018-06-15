import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'
import { IComment } from '../comments/models'

export interface IPost {
  _id: string
  comments: IComment[]
  owner: IUser
  text: string
  title: string
}

export interface IDocPost extends Document {
  _id: string
  ownerId: string
  text: string
  title: string
}

const postSchema = new mongoose.Schema({
  ownerId: String,
  text: String,
  title: String,
})

export const PostModel: Model<IDocPost> = mongoose.model('Post', postSchema)
