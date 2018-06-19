import { Model, Document, Types } from 'mongoose'
import events, { emitModelCreated } from '../events'

function findModel<T extends Document>(model: Model<T>, query: object) {
  return model.find(query)
}

async function save<T extends Document>(model: T) {
  const result = await model.save()
  emitModelCreated(events, model.collection.name, result)
  return result
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

async function modelExists<T extends Document>(
  model: Model<T>,
  id: string,
): Promise<boolean> {
  const result = await findModelById(model, id)
  return !!result
}

export { findModel, findModelById, save, list, modelExists }
