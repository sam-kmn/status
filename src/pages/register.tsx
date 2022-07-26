import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Register = () => {
  
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInput = (evt:any) => {
    setCredentials({...credentials, [evt.target.name]: evt.target.value})
  } 

  const submit = async (evt:any) => {
    evt.preventDefault()
    
    const res = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/signUp`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'}
    })).json()

    if (res.status) return router.push('/')
    else return setMessage(res.error) 
  }

  return (
    <div className="dynamic-frame flex-1 flex justify-center items-center">
      <form onSubmit={submit} className="flex-1 flex flex-col max-w-xs gap-3">
        <header className="text-4xl font-semibold text-center mb-5">Sign Up</header>
        {message && <div className="bg-red-300 rounded text-center p-3">{message}</div>}
        
        <input required value={credentials.name} onChange={handleInput} name="name" type="text" placeholder="Name" className="px-3 py-2 rounded bg-neutral-800"/>
        <input required value={credentials.email} onChange={handleInput} name="email" type="email" placeholder="Email" className="px-3 py-2 rounded bg-neutral-800"/>
        <input required value={credentials.password} onChange={handleInput} name="password" type="password" placeholder="Password" className="px-3 py-2 rounded bg-neutral-800"/>
        <button type="submit" className="bg-gradient-to-r from-purple-400 to-pink-600 py-2 rounded text-white text-lg font-semibold">Submit</button>
        <Link href='/login'>
          <button className="text-center text-neutral-500 hover:text-white transition duration-200">Already have an account?</button>
        </Link>
      </form>
    </div>
  )
}

export default Register