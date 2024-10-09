import jwt from 'jsonwebtoken'

export type TTokenPayload = {
  id: string
  email: string
}

export const generateAccessToken = (payload: TTokenPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' })

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string)
