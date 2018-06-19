import events, { pubsub } from './events'
import { IPost } from './posts/models'
import { IUser } from './users/models'
import { IComment } from './comments/models'

interface ModelInfo {
  collection: string
  data: IPost | IUser | IComment
}

events.on('model-created', (modelInfo: ModelInfo) => {
  if (modelInfo.collection === 'posts') {
    events.emit('post-created', modelInfo.data)
  }
})

events.on('post-created', (post: IPost) => {
  pubsub.publish('postAdded', {
    postAdded: post,
  })
})
