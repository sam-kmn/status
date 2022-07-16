import Link from "next/link";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "../utils/store";
import dayjs from "dayjs";

import {BiLike} from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'

const Post = ({post}: {post:any}) => {

  const { data: session } = useSession()
  const [menu, setMenu] = useState(false)
  const isAuthor = useMemo(() => session?.user?.name === post.author, [session?.user?.name])
  
  
  const editPost = useStore(state => state.editPost)
  const handleLike = async () => {
    if (!session) return
    let likes = [...post.likes]

    if (!post.likes) likes.push(session.user?.name)
    else if (post.likes.includes(session?.user?.name)) {likes = likes.filter(user => user !== session.user?.name)
    }
    else likes.push(session.user?.name)
      
    editPost({...post, likes: likes})
  }


  return post && (
    <div className="flex flex-col gap-4 relative bg-white rounded-lg shadow-xl p-5 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 ">
      
      {/* Author, Time, options */}
      <section className="flex justify-between text-xs ">
        <Link href={'/users/'+post.author}><button className="text-blue-500">{post.author}</button></Link>
        <div className="flex items-center gap-2">
          <div>{dayjs(post.date).format('DD/MM/YYYY HH:mm')}</div>
          {isAuthor && <BsThreeDots onClick={() => isAuthor && setMenu(!menu)} className="text-xl" />}
        </div>

      </section>

      {/* Menu */}
      { menu && isAuthor && 
        <div className="flex flex-col text-sm absolute right-0 top-12 bg-neutral-100 rounded-l overflow-hidden">
          <div className="px-3 py-1 hover:bg-neutral-200">Edit</div>
          <div className="px-3 py-1 hover:bg-neutral-200 text-red-500">Delete</div>
        </div>
      }
      
      {/* Content */}
      <section>
        <header className="text-lg font-semibold">{post.title}</header>
        <p>{post.body}</p>
      </section>
      
      {/* Comments, Likes, etc. */}
      <section className="flex justify-between ">
        <div className="text-neutral-400">{post.comments.length} comments</div>

        <div className="flex items-center justify-center gap-2">
          <div className="text-lg">{post.likes.length}</div>
          <button onClick={handleLike} className="text-2xl hover:scale-110 hover:-rotate-12 transition duration-200"><BiLike /></button>
        </div>
      </section>

    </div>

  )
}

export default Post