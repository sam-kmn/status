import { IPost } from './../models/Posts';

export const addPost = async (newPost: IPost) => {
  if (!newPost.title || !newPost.body || !newPost.author) return
  const res = await (await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts', {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {'Content-Type': 'application/json'}
  })).json()

  return res
}