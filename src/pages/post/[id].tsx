
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../utils/store'
import PostComponent from '../../components/Post'
import { FiSend } from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import Comment from '../../components/Comment'

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
        ...data.comments, 
        {
          author: session.user.name,
          author_image: session.user.image,
          comment: commentRef.current.value
        }
      ]
    })
    commentRef.current.value=''

  }

  useEffect(() => {
    if (posts.length > 0) return setData(isStored)
    fetchPosts()

  }, [posts, isStored]) 



  return data && (
    <div className='flex-1 flex flex-col gap-5 justify-center items-center container mx-auto  border-red-500 p-5'>

      <PostComponent post={data} />
      
      <div className='flex flex-col gap-8 bg-white rounded-lg shadow-xl w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 p-5'>
        <form onSubmit={comment} className="flex gap-2 items-center justify-between">
          <input ref={commentRef} type="text" placeholder='Write comment' className='flex-1' />
          <button type='submit' className=''>
            <FiSend className='text-xl rotate-45' />
          </button>
        </form>

        {data.comments && data.comments.map(comment => <Comment data={comment} />)}

      </div>


    </div>
  )
}

export default Post