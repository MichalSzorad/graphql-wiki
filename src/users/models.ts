import mongoose, { Document, Model } from 'mongoose'

export interface IUser {
  _id: string
  displayName: string
  email: string
  password: string
}

export interface IDocUser extends IUser, Document {
  _id: string
}

const userSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
})

export const UserModel: Model<IDocUser> = mongoose.model('User', userSchema)
