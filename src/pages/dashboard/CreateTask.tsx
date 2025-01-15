import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import addIcon from '../../assets/icons/Add_icon.svg'
import uploadIcon from '../../assets/icons/Upload_icon.svg'
import addOn from '../../assets/addon.png'


const CreateTask = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className='p-9 w-full flex flex-col gap-10 dark:text-black'>
      <div className='flex items-center gap-2'>
        <div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
          <img src = {backIcon} alt='back'/>
        </div> 
        <span className='font-semibold text-2xl'> Create New Task</span>
      </div>
      <div className='border border-[#D1D5DB] w-full'></div>
      <div>
      <div className="mb-4 w-full flex-1">
        <label htmlFor="billedTo" className="block text-left font-semibold mb-5 text-2xl text-gray-700">Add Title</label>
        <input
          type="text"
          id="billedTo"
          name="billedTo"
          placeholder='write here'
          className="w-full px-2 py-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:none"
        />
      </div>
      <div className="mb-4 w-full flex-1">
        <label htmlFor="billedTo" className="block text-left font-semibold mb-5 text-2xl text-gray-700">Add Description</label>
        <textarea
          id="billedTo"
          name="billedTo"
          placeholder='write here'
          rows={10} 
          className="w-full px-2 py-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:none"
        />
      </div>
      <div className='w-full flex justify-between'>
        <div className=' flex flex-col gap-5 max-w-[415px] w-full'>
          <h2 className='text-2xl font-semibold text-left '> Attachemnts</h2>
          <button className='rounded-md py-4 px-2 flex gap-2 justify-center border border-[#D1D5DB] w-full'>
            <img src={addIcon} alt='add image' /> Add
          </button>
          <button className='rounded-md py-4 px-2 flex gap-2 justify-center border border-[#D1D5DB] w-full'>
            <img src={uploadIcon} alt='add image' /> upload
          </button>
        </div>
        <div className='max-w-[340px] w-full'>
          <div className='bg-white max-w-[277px] h-[216px] flex flex-col gap-1 py-7 items-stretch justify-around justify-self-end px-10 mb-20 rounded-md'>
            <p className='font-normal text-lg text-[#202224]'> Credit required for this task</p>
            <p className='font-semibold text-3xl'> 01 </p>
            <div className='w-full justify-start flex px-10'>
            <img src={addOn} alt='credit icon' width={30}/>
            </div>
            <p className='text-[#00B69B] text-lg font-medium'> 12 credits left </p>
          </div>
          <button
          className= "w-full bg-primary-100 text-white border border-gray-300 rounded-full p-3 transition-all duration-1000"
        >
          Upload
        </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CreateTask