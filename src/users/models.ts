import mongoose, { Document, Model } from 'mongoose'

export interface IUser extends Document {
  id: string
  email: string
  password: string
  displayName: string
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  displayName: String,
})

export const UserModel: Model<IUser> = mongoose.model('User', userSchema)
