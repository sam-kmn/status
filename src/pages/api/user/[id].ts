// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Users from '../../../models/Users'
import Posts from '../../../models/Posts'
// import { getToken } from "next-auth/jwt"

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { id } = req.query
  switch (req.method){

    case 'GET': {
      try {
        const user = await Users.findById(id).select(['-password', '-email'])
        const posts = await Posts.find({author_id: id})
        if (!user) return res.status(400).json({status: false})
        res.status(200).json({status: true, data: {...user._doc, posts: [...posts]}})
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
