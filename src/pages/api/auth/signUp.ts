// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Users from '../../../models/Users'
import dbConnect from '../../../utils/dbConnect'
import bcrypt from 'bcrypt'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') return res.status(400).json({status: false})
  
  const credentials = req.body
  if (!credentials.name || !credentials.email || !credentials.password) return res.status(400).json({status: false})
  
  const match = await Users.findOne({email: credentials.email})
  if (match) return res.status(406).json({status: false, error: 'User is already registered!'})

  const salt = await bcrypt.genSalt(10)
  const hashpass = await bcrypt.hash(credentials.password, salt)

  const user = await Users.create({
    name: credentials.name,
    email: credentials.email,
    password: hashpass
  })

  res.status(200).json({status: true, user: user})
}
