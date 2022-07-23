import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Post from "../../components/Post"
import { IPost } from '../../models/Posts'

interface IUserProfile {
  _id: string
  name: string
  image: string
  posts: IPost[]

}

const User = () => {

  const [user, setUser] = useState<IUserProfile>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await (await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/' + id)).json()
        if (!res.status) return router.push('/error')
        setUser(res.data)
        console.log(res.data);
        
      } catch (error) {
        console.log(error);
      }

      setLoading(false)
    }

    if (id) fetchUser() 

  }, [id])

  if (loading) return <div>Loading...</div>

  if (user) return (
    <div className="flex flex-col justify-center items-center gap-5 py-10 px-5">
      <header>
        <img src={user.image} alt="User Avatar" className="rounded-full w-50 h-50" />
        <h1 className="text-2xl font-semibold text-center my-5">{user.name}</h1>
      </header>

      {user.posts && user.posts.map((post:any) => ( 
        <Link key={post._id} href={'/post/'+ post._id}>
          <a className="w-full">
            <Post post={post} />
          </a>
        </Link>
      ))}
    </div>
  )
}

export default User