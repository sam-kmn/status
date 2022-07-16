import { useState } from "react";
import { useSession } from "next-auth/react"
import { useStore } from "../utils/store";

const initialValue = {
  title: '',
  body: '',
}

const NewPost = () => {
  
  const { data: session } = useSession()
  const addPost = useStore(state => state.addPost)
  const [newPost, setNewPost ] = useState(initialValue)

  const handleInput = (evt: any) => setNewPost({...newPost, [evt.target.name]: evt.target.value})
  const upload = async () => {
    if ( !session?.user?.name || !newPost.title || !newPost.body) return
    addPost({...newPost, author: session.user.name})
    setNewPost(initialValue)
  }

  return session && (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-xl p-5 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 ">
      <input name="title" value={newPost.title} onChange={handleInput} type="text" placeholder="Title" className="text-lg font-semibold" />
      <textarea name="body" value={newPost.body} onChange={handleInput} placeholder="Share your thoughts" className="w-full max-h-20 resize-none" cols={30} rows={5} />
      <nav className="flex justify-end">
        <button onClick={upload} className="px-3 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 rounded">Post</button>
      </nav>
    </div>
  )
}

export default NewPost