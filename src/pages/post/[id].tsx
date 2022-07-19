
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../utils/store'
import PostComponent from '../../components/Post'
import { FiSend } from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import Comment from '../../components/Comment'
import { IComment } from '../../models/Posts'

const Post = () => {
  
  const { data: session } = useSession()
  const router = useRouter()
  const {id} = router.query

  const posts = useStore(state => state.posts)
  const isStored = useMemo(() => posts.find(post => post._id === id), [posts])
  const [data, setData] = useState(isStored)
  const fetchPosts = useStore(state => state.fetchPosts)
  const editPost = useStore(state => state.editPost)

  const commentRef = useRef<any>()
  const comment = (event:any) => {
    event.preventDefault()
    if (!commentRef.current.value || !data || !session?.user?.name || !session?.user?.image) return
    editPost({
      ...data, 
      comments: [
        ...(data.comments ? data.comments : []), 
        {
          author: session.user.name,
          author_image: session.user.image,
          comment: commentRef.current.value
        }
      ]
    })
    commentRef.current.value=''

  }

  const deleteComment = (comment: IComment) => {
    console.log(comment);
    if (!data || !comment) return
    editPost({
      ...data,
      comments: data.comments!.filter(c => c._id !== comment._id)
    })

  }

  useEffect(() => {
    if (posts.length > 0) return setData(isStored)
    fetchPosts()
  }, [posts, isStored]) 



  return data && (
    <div className='h-full flex flex-col gap-5 justify-start items-center overflow-scroll p-5'>
      
      <PostComponent post={data} />
      
      <div className='flex flex-col gap-8 w-full p-5 bg-neutral-800 rounded-lg shadow-xl '>
        <form onSubmit={comment} className="flex gap-2 items-center justify-between">
          <input ref={commentRef} type="text" placeholder='Write comment' className='flex-1 bg-inherit' />
          <button type='submit' className=''>
            <FiSend className='text-xl rotate-45 hover:text-pink-500 transition duration-200 ' />
          </button>
        </form>

        {data.comments && data.comments.map(comment => <Comment key={comment._id} data={comment} deleteComment={deleteComment} />)}

      </div>


    </div>
  )
}

export default Post