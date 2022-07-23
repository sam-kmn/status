import { IComment } from "../models/Posts"
import Link from 'next/link'
import dayjs from 'dayjs'
import { FiDelete } from "react-icons/fi"
import { useSession } from "next-auth/react"


const Comment = ({data, deleteComment}: {data: IComment, deleteComment: (comment:IComment) => void}) => {

  const { data: session } = useSession()

  return (
    <div className='flex flex-col gap-3 p-5 border-t border-neutral-700 '>
        <div className='flex items-center justify-between w-full text-neutral-500 font-semibold text-sm'>

          <Link href={'/user/' + data.author_id}>
            <div className='flex gap-3 items-center '>
              <img src={data.author_image} className='w-8 h-8 object-cover rounded-full'  alt="" />
              <div className=''>{data.author}</div>
            </div>
          </Link>

          <div className="flex items-center gap-2 ">
            <div>{dayjs(data.date).format('DD/MM/YYYY HH:mm:ss')}</div>
            { session?.user?.name === data.author && <button onClick={() => deleteComment(data)}><FiDelete className="text-red-400 text-lg" /></button>}
          </div>

        </div>
      <div className='whitespace-normal break-all'>{data.body}</div>
    </div>
  )
}

export default Comment