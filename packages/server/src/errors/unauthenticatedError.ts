import { CustomError } from './customError'
import type { TCustomErrorContent } from '@staffsphere/shared/src/types/error.types'

export default class UnauthenticatedError extends CustomError {
  readonly statusCode = 401
  private readonly _logging: boolean
  private readonly _errors: TCustomErrorContent[]

  constructor(params?: {
    message?: string
    logging?: boolean
    errors?: TCustomErrorContent[]
  }) {
    const { message, logging } = params || {}

    super(message || 'Unauthenticated')
    this._logging = logging || false
    this._errors = params?.errors || [{ message: 'Unauthenticated' }]

    Object.setPrototypeOf(this, UnauthenticatedError.prototype)
  }

  get errors(): TCustomErrorContent[] {
    return this._errors
  }

  get logging(): boolean {
    return this._logging
  }
}
