import { IPost } from './../models/Posts';
import create from 'zustand'

interface IStore {
  posts: IPost[]
  setPosts: (posts: IPost[]) => void
  fetchPosts: () => void,
  fetchPost: (id: string | string[]) => void,
  addPost: (post: IPost) => void
  editPost: (post: IPost) => void
  deletePost: (post: IPost) => void

}

export const useStore = create<IStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts: posts }),
  fetchPosts: async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts')
    const posts = await res.json()
    if (!posts.status) return
    set({ posts: posts.data })
  },
  fetchPost: async (id) => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts/' + id)
    const post = await res.json()
    if (!post.status) return
    set(state => ({ posts: [ post.data, ...state.posts ]}))
    
  },
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
  },
  deletePost: async (post) => {
    const res = await (await fetch(process.env.NEXT_PUBLIC_URL + '/api/posts/' + post._id, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}
    })).json()
    if (!res.status) return
    set(state => ({ posts: state.posts.filter(p => p._id !== post._id)}))
  }
}))