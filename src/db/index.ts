import mongoose from 'mongoose'

function init(connectionUrl: string): void {
  mongoose.connect(
    connectionUrl,
    {
      useMongoClient: true,
    },
  )
}

export { init }
