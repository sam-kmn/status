
const Modal = ({children, className}: {children:any, className?: string}) => {
  return (
    <div className="w-screen h-screen fixed inset-0 bg-black z-50 flex justify-center items-center" style={{backgroundColor:` rgba(0,0,0,0.8)`}}>
      <div className={`${className} flex flex-col bg-neutral-900 rounded-lg p-5`}>
        {children}
      </div>
    </div>
  )
}

export default Modal