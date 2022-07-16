import { useEffect } from "react";
import { useSession } from "next-auth/react"
import { useStore } from "../utils/store";
import NewPost from "../components/NewPost";
import Post from "../components/Post";

export default function Component() {

  const { data: session } = useSession()

  const posts = useStore(state => state.posts)
  const setPosts = useStore(state => state.setPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts')
      const posts = await res.json()
      if (posts.status) setPosts(posts.data)
    }
    fetchPosts()
  }, [])
  


  return session && (
    <div className="container mx-auto flex flex-col items-center content-center gap-5 py-10 px-5">

      <NewPost />

      {posts && posts.map((post:any) => <Post key={post._id} post={post} />  )}
    </div>
  )
}