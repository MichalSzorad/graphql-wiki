import { config } from 'dotenv'
import * as env from 'env-var'
config()

export const PORT: number = env
  .get('PORT')
  .required()
  .asIntPositive()

export const MONGODB_URI: string = env
  .get('MONGODB_URI')
  .required()
  .asString()
