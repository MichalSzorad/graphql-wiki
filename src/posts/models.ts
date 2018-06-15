import mongoose, { Document, Model } from 'mongoose'
import { IUser } from '../users/models'

export interface IPost {
  _id: string
  title: string
  text: string
  owner: IUser
}

export interface IDocPost extends Document {
  _id: string
  title: string
  text: string
  ownerId: string
}

const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  ownerId: String,
})

export const PostModel: Model<IDocPost> = mongoose.model('Post', postSchema)
