import { CustomError } from './customError'
import type { TCustomErrorContent } from '@staffsphere/shared/src/types/error.types'

export default class NotFoundError extends CustomError {
  readonly statusCode = 404
  private readonly _errors: TCustomErrorContent[]
  private readonly _logging: boolean

  constructor(params: {
    errors: TCustomErrorContent[]
    message?: string
    logging?: boolean
  }) {
    const { message, logging } = params || {}

    super(message || 'Not Found')
    this._errors = params.errors
    this._logging = logging || false

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  get errors(): TCustomErrorContent[] {
    return this._errors
  }

  get logging(): boolean {
    return this._logging
  }
}
