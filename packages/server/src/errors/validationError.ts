import { CustomError } from './customError'
import type { TCustomErrorContent } from '@staffsphere/shared/src/types/error.types'

export default class ValidationError extends CustomError {
  readonly statusCode = 422
  private readonly _errors: TCustomErrorContent[]
  private readonly _logging: boolean

  constructor(params: {
    errors: TCustomErrorContent[]
    message?: string
    logging?: boolean
  }) {
    const { message, logging } = params || {}

    super(message || 'Validation Error')
    this._errors = params.errors
    this._logging = logging || false

    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  get errors(): TCustomErrorContent[] {
    return this._errors
  }

  get logging(): boolean {
    return this._logging
  }
}
