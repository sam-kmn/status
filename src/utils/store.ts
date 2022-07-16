import { IPost } from './../models/Posts';
import create from 'zustand'

interface IStore {
  posts: IPost[]
  setPosts: (posts: IPost[]) => void
  addPost: (post: IPost) => void
  editPost: (post: IPost) => void


}

export const useStore = create<IStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts: posts }),
  addPost: async (post) => {
    const res = await (await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts', {
      method: "POST",
      body: JSON.stringify(post),
      headers: {'Content-Type': 'application/json'}
    })).json()
    if(!res.status) return
    set(state => ({ posts: [ res.data, ...state.posts ]}))
    
  },
  editPost: async (post) => {
    const res = await (await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts/' + post._id, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {'Content-Type': 'application/json'}
    })).json()
    if (!res.status) return
    set(state => ({ posts: state.posts.map(i => i._id === post._id ? res.data : i)}))
  }
}))