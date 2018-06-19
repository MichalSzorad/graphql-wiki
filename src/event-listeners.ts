import events, { pubsub } from './events'
import { IPost } from './posts/models'
import { IUser } from './users/models'
import { IComment } from './comments/models'

interface ModelInfo {
  collection: string
  data: IPost | IUser | IComment
}

type Map<T> = { [key: string]: T }

const eventModelCreatedCollectionMap: Map<string> = {
  posts: 'post-created',
  comments: 'comment-created',
}

events.on('model-created', (modelInfo: ModelInfo) => {
  const { collection, data } = modelInfo
  if (collection in eventModelCreatedCollectionMap) {
    events.emit(eventModelCreatedCollectionMap[collection], data)
  }
})

events.on('post-created', (post: IPost) => {
  pubsub.publish('postAdded', {
    postAdded: post,
  })
})

events.on('comment-created', (comment: IComment) => {
  pubsub.publish('commentAdded', {
    commentAdded: comment,
  })
})
