import { Schema, models, model } from "mongoose";

export interface IComment {
  author: string
  author_id: string
  author_image: string
  body: string
  date?: string
  _id?:string
}

export interface IPost {
  author: string
  author_id: string
  body: string
  comments?: IComment[]
  likes?: string[]
  date?: string
  _id?: string
}

const PostSchema = new Schema<IPost>({
  author: {type: String, required: true},
  author_id: {type: String, required: true},
  body:   {type: String, required: true},
  comments: [
    {
      author: {type: String, required: true},
      author_id: {type: String, required: true},
      author_image: {type: String, required: true},
      body: {type: String, required: true},
      date: { type: Date, default: Date.now }
    }
  ],
  likes: Array,
  date: { type: Date, default: Date.now },
});

export default models.Post || model('Post', PostSchema)
