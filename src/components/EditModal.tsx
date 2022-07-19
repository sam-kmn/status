import { useState } from "react"
import { IPost } from "../models/Posts"
import Modal from "./Modal"

interface IEditModal {
  state: boolean, 
  post: IPost,
  submitEvent: (data: IPost) => void,
  closeEvent: () => void
}

const EditModal = ({state, post, submitEvent, closeEvent }: IEditModal) => {

  const [data, setData] = useState(post)

  const submit = () => {
    submitEvent(data)
    closeEvent()
  }

  if (state) return (
    <Modal>
      <form className="flex flex-col">
        <textarea name="body" value={data.body} onChange={event => setData({...data, body: event.target.value})} placeholder="Share your thoughts" className=" bg-inherit text-2xl w-full max-h-20 resize-none" cols={30} rows={5} />
        <nav className="flex justify-end gap-4 ">
          <button onClick={closeEvent} className="px-4 py-1 tracking-wider border border-white text-white hover:bg-white hover:text-black transition duration-200 rounded">Cancel</button>
          <button onClick={submit} className="px-4 py-1 tracking-wider border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-200 rounded">Submit</button>
        </nav>
      </form>
    </Modal>
  )
  else return null
}

export default EditModal