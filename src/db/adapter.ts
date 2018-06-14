import { Model, Document } from 'mongoose'

function findModel<T extends Document>(model: Model<T>, query: object) {
  return model.find(query)
}

function save<T extends Document>(model: T) {
  return model.save()
}

async function findModelById<T extends Document>(model: Model<T>, id: string) {
  return await model.findById(id)
}

export { findModel, findModelById, save }
