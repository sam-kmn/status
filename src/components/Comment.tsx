import { IComment } from "../models/Posts"
import Link from 'next/link'
import dayjs from 'dayjs'
import { FiDelete } from "react-icons/fi"
import { useSession } from "next-auth/react"
import { useStore } from "../utils/store"


const Comment = ({data, deleteComment}: {data: IComment, deleteComment: (comment:IComment) => void}) => {

  const { data: session } = useSession()

  return (
    <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between w-full text-neutral-500 font-semibold text-sm'>

          <Link href={'/user/' + data.author}>
            <div className='flex gap-3 items-center '>
              <img src={data.author_image} className='w-8 h-8 object-cover rounded-full'  alt="" />
              <div className=''>{data.author}</div>
            </div>
          </Link>

          <div className="flex items-center gap-2 ">
            <div>{dayjs(data.date).format('DD/MM/YYYY HH:mm:ss')}</div>
            { session?.user?.name === data.author && <button onClick={() => deleteComment(data)}><FiDelete className="text-red-400" /></button>}
          </div>

        </div>
      <div className='whitespace-normal break-all'>{data.comment}</div>
    </div>
  )
}

export default Comment