import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { IPost } from "../models/Posts";

export default function Component() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>()
  const newPost = (newPost: IPost) => setData([newPost, ...data])
  const replacePost = (targetPost: IPost) => {
    setData(data.map((post: IPost) => post._id === targetPost._id ? targetPost : post))
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts')
      const posts = await res.json()
      if (posts.status) setData(posts.data)
    }
  
    fetchPosts()

  }, [])
  


  return session && (
    <div className="container mx-auto flex flex-col items-center content-center gap-5 py-10 px-5 border">

      <NewPost newPostEvent={newPost} />

      {data && data.map((post:any) => <Post key={post._id} post={post} editEvent={replacePost} />)}
    </div>
  )
}