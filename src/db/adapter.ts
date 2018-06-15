import { Model, Document, Types } from 'mongoose'

function findModel<T extends Document>(model: Model<T>, query: object) {
  return model.find(query)
}

function save<T extends Document>(model: T) {
  return model.save()
}

async function findModelById<T extends Document>(model: Model<T>, id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return null
  }
  return await model.findById(id)
}

function list<T extends Document>(model: Model<T>) {
  return findModel<T>(model, {})
}

export { findModel, findModelById, save, list }
