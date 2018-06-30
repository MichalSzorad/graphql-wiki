import { createError } from 'apollo-errors'

export const FieldRequiredError = createError('FieldRequiredError', {
  message: 'Valid field must be passed',
})
