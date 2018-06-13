import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  displayName: string
}

const userSchema = new Schema({
  email: String,
  password: String,
  displayName: String,
})

export const UserModel: Model<IUser> = mongoose.model('User', userSchema)
