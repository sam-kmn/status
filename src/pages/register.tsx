import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CgSpinner } from 'react-icons/cg'

const Register = () => {
  
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await ( await fetch(process.env.NEXT_PUBLIC_URL + '/api/user')).json()
        if (!res.status) throw Error('Users could not be fetched!')
        setUsers(res.data)
      } catch (error:any) {
        alert(error.message)
        router.push('/error')
      }
    }

    fetchUsers()

  }, [])

  useEffect(() => {
    setMessage('')
  }, [credentials])

  const nameValidator = () => { 
    let regex = /[~`!@#$%^&*+=[\]\\';,._/{}()|\\":<>?\s]/g
    if (!credentials.name)                throw Error("Name can't be empty!")
    if (users.includes(credentials.name)) throw Error("This name is already taken!")
    if (regex.test(credentials.name))     throw Error("Special characters are not allowed!")
  }

  const handleInput = (evt:any) => {
    setCredentials({...credentials, [evt.target.name]: evt.target.value})
  } 

  const submit = async (evt:any) => {
    evt.preventDefault()
    setLoading(true)
    try {
      nameValidator()
      const res = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/signUp`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {'Content-Type': 'application/json'}
      })).json()
  
      if (res.status) return router.push('/')
      else throw Error(res.error)
    } 
    catch (error: any) { setMessage(error.message) } 
    finally { setLoading(false) }

  }

  return (
    <div className="dynamic-frame flex-1 flex justify-center items-center">
      <form onSubmit={submit} className="flex-1 flex flex-col max-w-xs gap-3">
        <header className="text-4xl font-semibold text-center mb-5">Sign Up</header>
        {message && <div className="bg-red-300 rounded text-center p-3">{message}</div>}
        
        <input disabled={loading} required value={credentials.name} onChange={handleInput} name="name" type="text" placeholder="Name" className="px-3 py-2 rounded bg-neutral-800"/>
        <input disabled={loading} required value={credentials.email} onChange={handleInput} name="email" type="email" placeholder="Email" className="px-3 py-2 rounded bg-neutral-800"/>
        <input disabled={loading} required value={credentials.password} onChange={handleInput} name="password" type="password" placeholder="Password" className="px-3 py-2 rounded bg-neutral-800"/>
        <button disabled={loading} type="submit" className="flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-600 py-2 rounded text-white text-lg font-semibold">{loading ? <CgSpinner className="text-xl animate-spin" /> : 'Submit'}</button>
        <Link href='/login'>
          <button className="text-center text-neutral-500 hover:text-white transition duration-200">Already have an account?</button>
        </Link>
      </form>
    </div>
  )
}

export default Register