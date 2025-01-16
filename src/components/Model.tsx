type SetIsModalOpenType = (value: boolean | ((prevState: boolean) => boolean)) => void;
interface ModelProps {
  setIsModalOpen: SetIsModalOpenType;
  isModal: boolean
}

const Model: React.FC<ModelProps> = ({ setIsModalOpen, isModal }) => {
  const closeModal = () => setIsModalOpen(false);
  const handleClickOutside = () => {
    if (isModal) { closeModal();}
  };
	return (
    <div
    id="modal-overlay" 
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={handleClickOutside} 
  >
    
    <div className="absolute inset-0 bg-black opacity-70"></div>
  
    
    <div className="relative z-10 w-full max-w-md max-h-full p-4 bg-white rounded-lg shadow dark:bg-gray-700">
      
      <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
        <h3 className="w-full text-center text-[36px] font-semibold text-gray-900 dark:text-white">
         Logout
        </h3>
      </div>
      <p className="text-xl text-[#9CA3AF]"> Do you really wanna logout</p>      
      <div className="flex gap-3 items-center p-4 md:p-5 dark:border-gray-600 w-full justify-center mt-5 mb-3">
        <button
          data-modal-hide="default-modal"
          type="button"
          className="px-8 py-2.5 text-sm font-medium text-[#EF4444] hover:text-white bg-[#FEE2E2] rounded-lg hover:bg-[#EF4444] focus:ring-0 focus:outline-none focus:ring-none"
          onClick={closeModal}
        >
          I accept
        </button>
        <button
          data-modal-hide="default-modal"
          type="button"
          className="px-8 py-2.5 text-sm font-medium text-[#4B5563] hover:text-white bg-[#E5E7EB] rounded-lg hover:bg-[#4B5563] focus:ring-0 focus:outline-none focus:ring-none"
          onClick={closeModal}
        >
          Decline
        </button>
      </div>
    </div>
  </div>
  
  
	);
};

export default Model;
