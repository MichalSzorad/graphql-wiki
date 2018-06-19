import { EventEmitter } from 'events'
import { PubSub } from 'graphql-subscriptions'
import { Document } from 'mongoose'

export const pubsub = new PubSub()
export default new EventEmitter()

export function emitModelCreated(
  emitter: EventEmitter,
  collection: string,
  model: Document,
) {
  emitter.emit('model-created', { collection, data: model })
  return model
}
