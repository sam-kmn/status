import { useEffect } from "react";
import { useStore } from "../utils/store";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import Link from "next/link";
import PostSkeleton from "../components/PostSkeleton";

export default function Component() {

  const posts = useStore(state => state.posts)
  const loading = useStore(state => state.loading)
  const fetchPosts = useStore(state => state.fetchPosts)

  useEffect(() => {
    if (posts.length > 0) return
    fetchPosts()
  }, [])
  

  if (loading) return (
    <div className="dynamic-frame flex flex-col gap-5 py-10 px-5">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )

  return  (
    <div className="dynamic-frame flex flex-col gap-5 py-10 px-5">
      
      <NewPost />

      {posts && posts.map((post:any) => ( 
        <Link key={post._id} href={'/post/'+ post._id}>
          <a className="w-full">
            <Post post={post} />
          </a>
        </Link>
      ))}

    </div>
  )
}