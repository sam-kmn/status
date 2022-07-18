import { Schema, models, model } from "mongoose";

export interface IComment {
  author: string,
  author_image: string,
  comment: string,
  date?: string,
  _id?:string
}

export interface IPost {
  title: string,
  author: string
  body: string,
  comments: IComment[],
  likes?: string[],
  date?: string,
  _id?: string
}

const PostSchema = new Schema<IPost>({
  title:  {type: String, required: true},
  author: {type: String, required: true},
  body:   {type: String, required: true},
  comments: [
    {
      author: {type: String, required: true},
      author_image: {type: String, required: true},
      comment: {type: String, required: true},
      date: { type: Date, default: Date.now }
    }
  ],
  likes: Array,
  date: { type: Date, default: Date.now },
});

export default models.Post || model('Post', PostSchema)

// { 'sancho': 'Damn thats cool' }