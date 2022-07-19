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
  const { id } = req.query
  switch (req.method){

    case 'GET': {
      try {
        const post = await Posts.findById(id)
        if (!post) return res.status(400).json({status: false})
        res.status(200).json({status: true, data: post})
      } catch (error) {
        res.status(400).json({status: false})
      }    
      break
    }

    case 'PUT': {
      try {
        if (!token) return res.status(401).json({status: false}) 
        const post = await Posts.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!post) return res.status(400).json({status: false})
        res.status(200).json({status: true, data: post})
      } catch (error) {
        res.status(400).json({status: false})
      }    
      break
    }

    case 'DELETE': {
      try {
        if (!token) return res.status(401).json({status: false}) 
        const deletedPost = await Posts.deleteOne({_id: id})
        if (!deletedPost) return res.status(400).json({status: false})
        res.status(201).json({status: true})
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
