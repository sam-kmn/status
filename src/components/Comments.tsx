import React, { useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useStore } from '../utils/store'
import { IComment, IPost } from '../models/Posts'
import Comment from './Comment'
import { FiSend } from 'react-icons/fi'

const Comments = ({data}: {data:IPost}) => {

  const { data: session } = useSession()
  const commentRef = useRef<any>()
  const editPost = useStore(state => state.editPost)
  const addComment = (event:any) => {
    event.preventDefault()
    if (!commentRef.current.value || !data || !session?.user?.name || !session?.user?.image || !session.id || typeof session.id !== 'string') return
    console.log(session.id);
    
    editPost({
      ...data, 
      comments: [
        {
          author: session.user.name,
          author_id: session.id,
          author_image: session.user.image,
          body: commentRef.current.value
        },
        ...(data.comments ? data.comments : []) 
      ]
    })
    commentRef.current.value=''

  }
  const deleteComment = (comment: IComment) => {
    if (!data || !comment) return
    editPost({
      ...data,
      comments: data.comments!.filter(c => c._id !== comment._id)
    })

  }

  return (
    <div className='flex flex-col w-full bg-neutral-800 rounded-lg shadow-xl overflow-scroll'>
      {session && (
        <form onSubmit={addComment} className="flex gap-2 p-5 items-center justify-between ">
          <input ref={commentRef} type="text" placeholder='Write comment' className='flex-1 bg-inherit' />
          <button type='submit' className=''>
            <FiSend className='text-xl rotate-45 hover:text-pink-500 transition duration-200 ' />
          </button>
        </form>
      )}
      {data.comments && data.comments.map(comment => <Comment key={comment._id} data={comment} deleteComment={deleteComment} />)}
    </div>
  )
}

export default Comments