import { Schema, models, model } from "mongoose";

export interface IComment {
  author: String,
  comment: String,
  date: String
}

export interface IPost {
  title: string,
  author: string
  body: string,
  comments?: IComment[],
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
      author: String,
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ],
  likes: Array,
  date: { type: Date, default: Date.now },
});

export default models.Post || model('Post', PostSchema)

// { 'sancho': 'Damn thats cool' }