import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useStore } from "../utils/store";
import { IPost } from "../models/Posts";
import dayjs from "dayjs";

import {BiLike} from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineShareAlt } from 'react-icons/ai'

import EditModal from "./Modals/EditModal";
import ShareModal from "./Modals/ShareModal";
import DeleteModal from "./Modals/DeleteModal";

const Post = ({post}: {post:any}) => {

  const router = useRouter()
  const { data: session } = useSession()
  const [menu, setMenu] = useState(false)
  const isAuthor = useMemo(() => session?.user?.name === post.author, [session?.user?.name])
  const editPost = useStore(state => state.editPost)
  const deletePost = useStore(state => state.deletePost)
  
  const handleLike = async () => {
    if (!session) return
    let likes = [...post.likes]

    if (!post.likes) likes.push(session.user?.name)
    else if (post.likes.includes(session?.user?.name)) {likes = likes.filter(user => user !== session.user?.name)
    }
    else likes.push(session.user?.name)
      
    editPost({...post, likes: likes})
  }

  const handleEdit = (data: IPost) => {
    if (session?.user?.name !== post.author) return 
    if (data.body === post.body) return 
    editPost(data)
  }

  const handleDelete = () => {
    if (session?.user?.name !== post.author) return 
    deletePost(post)
  }

  const [modals, setModals] = useState({
    share: false,
    edit: false,
    delete: false
  })
  const switchModal = (name: string, value: boolean) => setModals({...modals, [name]: value})

  return post && ( 
    <div className="flex flex-col gap-4 p-5 w-full relative bg-neutral-800 rounded-lg shadow-xl ">
      
      {/* Author, Time, options */}
      <section className="flex justify-between text-xs ">
        <Link href={'/user/'+post.author_id}><button className="text-pink-500">{post.author}</button></Link>
        <div className="flex items-center gap-2">
          <div>{dayjs(post.date).format('DD/MM/YYYY HH:mm')}</div>
          {isAuthor && <BsThreeDots onClick={() => isAuthor && setMenu(!menu)} className="text-xl" />}
        </div>

      </section>

      {/* Menu */}
      { menu && isAuthor && 
        <div className="flex flex-col md:text-sm absolute right-0 top-12 bg-neutral-900 rounded-l overflow-hidden z-20">
          <div onClick={() => switchModal('share', true)} className="flex items-center justify-start gap-1 px-5 py-2 hover:bg-black"><AiOutlineShareAlt/> Share</div>
          <div onClick={() => switchModal('edit', true)} className="flex items-center justify-start gap-1 px-5 py-2 hover:bg-black"><AiOutlineEdit /> Edit</div>
          <div onClick={() => switchModal('delete', true)} className="flex items-center justify-start gap-1 px-5 py-2 hover:bg-black text-red-500"><AiOutlineDelete /> Delete</div>
        </div>
      }
      
      {/* Content */}
      <section className="text-2xl md:text-3xl py-3 whitespace-pre-wrap">
        {post.body}
      </section>
      
      {/* Comments, Likes, etc. */}
      <section className="flex justify-between ">
        <Link href={'/post/' + post._id}>
          <div className="text-neutral-400">{post.comments.length} comments</div>
        </Link>

        <div className="flex items-center justify-center gap-2">
          <div className="text-lg">{post.likes.length}</div>
          <button onClick={() => session ? handleLike() : router.push('/login')} className="text-2xl hover:text-pink-500 hover:scale-110 hover:-rotate-12 transition duration-200"><BiLike /></button>
        </div>
      </section>

      <ShareModal state={modals.share} closeEvent={() => switchModal('share', false)} />
      <EditModal state={modals.edit} post={post} submitEvent={handleEdit} closeEvent={() => switchModal('edit', false)} />
      <DeleteModal state={modals.delete} closeEvent={() => switchModal('delete', false)} submitEvent={handleDelete} />
    </div>
  )
}

export default Post