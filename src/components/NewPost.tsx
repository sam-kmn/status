import { useState } from "react";
import { useSession } from "next-auth/react"
import { useStore } from "../utils/store";



const NewPost = () => {
  
  const { data: session } = useSession()
  const addPost = useStore(state => state.addPost)
  const [newPost, setNewPost] = useState('')

  const upload = async () => {
    if ( !session?.user?.name || !newPost) return
    addPost({body: newPost, author: session.user.name})
    setNewPost('')
  }

  return session && (
    <div className="flex flex-col gap-2 p-5 w-full bg-neutral-800 rounded-lg shadow-xl ">
      {/* <header className="font-semibold text-2xl text-neutral-300">Add new post</header> */}
      <textarea name="body" value={newPost} onChange={event => setNewPost(event.target.value)} placeholder="Share your thoughts" className=" bg-inherit text-2xl w-full max-h-20 resize-none" cols={30} rows={5} />
      <nav className="flex justify-end">
        <button onClick={upload} className="px-4 py-1 tracking-wider border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-200 rounded">Post</button>
      </nav>
    </div>
  )
}

export default NewPost