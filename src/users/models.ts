import mongoose, { Document, Model } from 'mongoose'

export interface IUser {
  _id: string
  createdAt: Date
  displayName: string
  email: string
  password: string
  updatedAt: Date
}

export interface IDocUser extends IUser, Document {
  _id: string
}

const userSchema = new mongoose.Schema(
  {
    displayName: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
  },
)

export const UserModel: Model<IDocUser> = mongoose.model('User', userSchema)
