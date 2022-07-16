// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Posts from '../../../models/Posts'
import dbConnect from '../../../utils/dbConnect'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method){

    case 'GET': {
      try {
        const posts = await Posts.find({}).sort('-date')
        res.status(200).json({status: true, data: posts})
      } catch (error) {
        res.status(400).json({status: false})
      }    
      break
    }

    case 'POST': {
      try {
        const post = await Posts.create(req.body)
        res.status(201).json({status: true, data: post})
      } catch (error) {
        res.status(400).json({status: false})
      }    
      break
    }

    default: {
      res.status(400).json({status: false})
      break
    }
  }
}
