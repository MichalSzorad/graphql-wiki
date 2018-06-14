import { Model, Document } from 'mongoose'

function findModel<T extends Document>(model: Model<T>, query: object) {
  return model.find(query)
}

function save(model: Document) {
  return model.save()
}

function findModelById<T extends Document>(model: Model<T>, id: string) {
  return model.findById(id)
}

export { findModel, findModelById, save }
