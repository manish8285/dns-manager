import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// import { jwtExp,jwtSec } from '../config/config'
export const checkPassword = (password, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        reject(err)
      }

      resolve(same)
    })
  })
}

export const newToken = user => {
  return jwt.sign({id: user._id},process.env.JWT_SECRET, {
    expiresIn: '100d',
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

