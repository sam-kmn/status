
import { useRouter } from 'next/router'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../../utils/store'
import PostComponent from '../../components/Post'
import Comments from '../../components/Comments'

const Post = () => {
  
  const router = useRouter()
  const {id} = router.query

  const posts = useStore(state => state.posts)
  const fetchPosts = useStore(state => state.fetchPosts)

  const isStored = useMemo(() => posts.find(post => post._id === id), [posts])
  const [data, setData] = useState(isStored)

  useEffect(() => {
    if (posts.length === 0) fetchPosts()
    else if (isStored) setData(isStored)
    else router.push('/')
  }, [posts, isStored]) 



  return data && (
    <div className='h-full flex flex-col gap-5 justify-start items-center overflow-hidden p-5'>
      <PostComponent post={data} />
      <Comments data={data} />
    </div>
  )
}

export default Post