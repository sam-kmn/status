import { IComment } from "../models/Posts"
import Link from 'next/link'
import dayjs from 'dayjs'


const Comment = ({data}: {data: IComment}) => {
  return (
    <div key={data._id} className='flex flex-col gap-2'>
        <div className='flex items-center justify-between w-full text-neutral-500 font-semibold text-sm'>

          <Link href={'/user/' + data.author}>
            <div className='flex gap-3 items-center '>
              <img src={data.author_image} className='w-8 h-8 object-cover rounded-full'  alt="" />
              <div className=''>{data.author}</div>
            </div>
          </Link>

          <div>{dayjs(data.date).format('DD/MM/YYYY HH:mm:ss')}</div>

        </div>
      <div className='whitespace-normal break-all'>{data.comment}</div>
    </div>
  )
}

export default Comment