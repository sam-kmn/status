import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { FiSend, FiUser } from 'react-icons/fi'
import { HiLogout } from 'react-icons/hi'
import { IoMdLogOut } from 'react-icons/io'

const Navbar = () => {

  const { data: session } = useSession()

  return (
    <div className="w-full bg-blue-500 text-white">
      <nav className="container mx-auto flex justify-between items-center py-3 px-5">

        {/* Brand */}
        <Link href={'/'}>
          <button className="flex items-center gap-1 font-semibold text-xl tracking-widest">
            Status
            <FiSend className="rotate-45" />
          </button>
        </Link>

        <input type="text" className="p-2 px-5 flex-1 max-w-md bg-blue-400 rounded-full placeholder:text-blue-100" placeholder="Search by hashtag"  />

        {session && session.user?.image &&
        <div className="flex gap-8">
          <Link href={'/user/'+session.user.name}>
            <img src={session.user?.image} className='w-10 h-10 rounded-full cursor-pointer' alt="" />
          </Link>

          <button className="flex items-center justify-center gap-2" onClick={() => signOut()}>
            <HiLogout className="text-xl" />
          </button>
        </div>
        }
      </nav>
    </div>
  )
}

export default Navbar