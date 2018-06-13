import { Model, Document } from 'mongoose'

function findModel<T extends Document>(model: Model<T>, query: object) {
  return model.find(query)
}

export { findModel }
