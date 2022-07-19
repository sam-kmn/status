import Modal from './Modal'

interface IDeleteModal {
  state: boolean, 
  closeEvent: () => void,
  submitEvent: () => void
}

const DeleteModal = ({state, closeEvent, submitEvent}: IDeleteModal) => {
  if (state) return (
    <Modal className='max-w-sm sm:max-w-md md:max-w-lg gap-3'>
      <h1 className='text-xl font-semibold '>Are you sure?</h1>
      <p className="text-lg">This action is irreversible, after you submit your post will be deleted permanently!</p>
      <div className="flex justify-end gap-4 pt-5">
        <button onClick={closeEvent} className="px-4 py-1 tracking-wider border border-white text-white hover:bg-white hover:text-black transition duration-200 rounded">Cancel</button>
        <button onClick={submitEvent} className="px-4 py-1 tracking-wider border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-200 rounded">Yes</button>
      </div>
    </Modal>
  )
  else return null

}

export default DeleteModal