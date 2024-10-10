import { CustomError } from './customError'
import type { TCustomErrorContent } from '@staffsphere/shared/src/types/error.types'

export default class UnauthorizedError extends CustomError {
  readonly statusCode = 403
  private readonly _logging: boolean
  private readonly _errors: TCustomErrorContent[]

  constructor(params?: {
    message?: string
    logging?: boolean
    errors?: TCustomErrorContent[]
  }) {
    const { message, logging } = params || {}

    super(message || 'Unauthorized')
    this._logging = logging || false
    this._errors = params?.errors || [{ message: 'Unauthorized' }]

    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  get errors(): TCustomErrorContent[] {
    return this._errors
  }

  get logging(): boolean {
    return this._logging
  }
}
