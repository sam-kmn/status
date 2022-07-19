// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Posts from '../../../models/Posts'
import dbConnect from '../../../utils/dbConnect'
import { getToken } from "next-auth/jwt"

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  switch (req.method){

    case 'GET': {
      try {
        const posts = await Posts.find({}).sort('-date')
        res.status(200).json({status: true, data: posts})
      } catch (error) {
        res.status(400).json({status: false, error: error})
      }    
      break
    }

    case 'POST': {
      try {
        if (!token) return res.status(401).json({status: false}) 
        const post = await Posts.create(req.body)
        res.status(201).json({status: true, data: post})
      } catch (error) {
        res.status(400).json({status: false, error: error})
      }    
      break
    }

    default: {
      res.status(400).json({status: false})
      break
    }
  }
}
