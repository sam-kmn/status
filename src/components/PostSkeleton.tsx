
const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full bg-neutral-800 p-5 rounded-lg shadow-xl animate-pulse">
      <div className="bg-neutral-900 w-20 h-4 rounded-full mb-5"></div>
      <div className="bg-neutral-900 w-full h-5 rounded-full"></div>
      <div className="bg-neutral-900 w-full h-5 rounded-full"></div>
      <div className="bg-neutral-900 w-2/3 h-5 rounded-full"></div>
      <div className="flex justify-between mt-5">
        <div className="bg-neutral-900 w-48 h-5 rounded-full"></div>
        <div className="bg-neutral-900 w-8 h-8 rounded-full"></div>
      </div>
    </div>
  )
}

export default PostSkeleton