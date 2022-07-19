import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Modal from './Modal'

const ShareModal = ({state, closeEvent}: {state: boolean, closeEvent: () => void}) => {

  const {asPath} = useRouter()

  useEffect(() => {
    if (state) navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL + asPath)
  }, [state])

  if (state) return (
    <Modal>
      <p className="text-lg">Link has been copied to your clipboard</p>
      <div className="flex justify-end pt-5">
        <button onClick={closeEvent} className="px-4 py-1 tracking-wider border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-200 rounded">Ok</button>
      </div>
    </Modal>
  )
  else return null
  
}

export default ShareModal