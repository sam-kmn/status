import { useState } from "react";
import { useSession } from "next-auth/react"
import { IPost } from "../models/Posts";


const NewPost = ({newPostEvent}: {newPostEvent: (data: IPost) => void}) => {
  const { data: session } = useSession()
  
  const [newPost, setNewPost ] = useState({
    title: '',
    body: '',
  })
  const handleInput = (evt: any) => setNewPost({...newPost, [evt.target.name]: evt.target.value})
  
  const addPost = async () => {
    if ( !session || !newPost.title || !newPost.body) return
    const res = await (await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts', {
      method: "POST",
      body: JSON.stringify({...newPost, author: session.user?.name}),
      headers: {'Content-Type': 'application/json'}
    })).json()
    
    if (!res.status) return
    newPostEvent(res.body)
  }

  return session && (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-xl p-5 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 ">
      <input name="title" value={newPost.title} onChange={handleInput} type="text" placeholder="Title" className="text-lg font-semibold" />
      <textarea name="body" value={newPost.body} onChange={handleInput} placeholder="Share your thoughts" className="w-full max-h-20 resize-none" cols={30} rows={5} />
      <nav className="flex justify-end">
        <button onClick={addPost} className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 rounded">Post</button>
      </nav>
    </div>
  )
}

export default NewPost