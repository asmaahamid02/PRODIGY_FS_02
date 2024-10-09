import type { TCustomErrorContent } from '@staffsphere/shared/src/types/error.types'

export abstract class CustomError extends Error {
  abstract readonly statusCode: number
  abstract readonly logging: boolean
  abstract readonly errors: TCustomErrorContent[]

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
