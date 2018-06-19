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

export const WS_PORT: number = env
  .get('WS_PORT')
  .required()
  .asIntPositive()

export const SESSION_SECRET: string = env
  .get('SESSION_SECRET')
  .required()
  .asString()
