import { useEffect } from "react";
import { useSession } from "next-auth/react"
import { useStore } from "../utils/store";
import NewPost from "../components/NewPost";
import Post from "../components/Post";

export default function Component() {

  const { data: session } = useSession()

  const posts = useStore(state => state.posts)
  const fetchPosts = useStore(state => state.fetchPosts)

  useEffect(() => {
    if (posts.length > 0) return
    fetchPosts()
  }, [])
  


  return session && (
    <div className="flex flex-col items-center justify-center gap-5 py-10 px-5">

      <NewPost />

      {posts && posts.map((post:any) => <Post key={post._id} post={post} />  )}
    </div>
  )
}