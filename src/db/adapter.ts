import { Model, Document, Types } from 'mongoose'
import events, { emitModelCreated } from '../events'

type Partial<T> = { [K in keyof T]?: T[K] }

function findModel<T extends Document>(model: Model<T>, query: object) {
  return model.find(query)
}

async function saveModel<T extends Document>(model: T) {
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

function updateModelById<T extends Document>(
  model: Model<T>,
  id: string,
  object: Partial<T>,
) {
  return model.findByIdAndUpdate(id, object, { new: true })
}

async function modelExists<T extends Document>(
  model: Model<T>,
  id: string,
): Promise<boolean> {
  const result = await findModelById(model, id)
  return !!result
}

export {
  findModel,
  findModelById,
  list,
  modelExists,
  saveModel,
  updateModelById,
}
