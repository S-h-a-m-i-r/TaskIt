import { useNavigate } from "react-router-dom";
import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import ListItem from "../../components/ListItem";
import deleteIcon from '../../assets/icons/Delete_icon.svg';
import attachment from '../../assets/icons/attachment_icon.svg';
import sendIcon from '../../assets/icons/Send_icon.svg'
import { useState } from "react";


const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  };

  const [messages, setMessages] = useState([
    { text: 'Sharing details on the status of the UI/UX task ensures transparency and keeps all stakeholders informed.', sender: 'bot' },
    { text: 'UI/UX update', sender: 'user' },
    { text: 'Regular updates on the UI/UX task help maintain momentum and ensure alignment with task goals.', sender: 'bot' },
    { text: "I'm reaching out to request the latest updates on the current UI/UX task progress.", sender: 'user' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };
  
  return (
    <div className='p-9 w-full flex flex-col gap-10 dark:text-black'>
      <div className='flex items-center gap-3'>
        <div className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex" onClick={handleGoBack}>
          <img src = {backIcon} alt='back'/>
        </div> 
        <span className='font-semibold text-2xl'> Book Reading/ TSK-127 <span className="text-[#3B82F6]"> (In Progress)</span></span>
      </div>
      <div className="bg-gray-100 w-full border border-1"></div>
      <div className="flex gap-6">
          <div className="md:w-1/2">
            <h2 className="text-[#3B82F6] text-xl text-left font-semibold mb-6"> 20 Dec 2024 </h2>
            <div className="w-full max-w-570px text-left flex flex-col gap-6 ">
              <h2 className="font-semibold text-xl"> Task Details </h2>
              <p> The Horizon E-commerce Redesign task is 60% complete and set to finish by January 2025, led by Sarah Smith, David Lee, and Jennifer Kim. The Virtual Reality Marketing App has been completed, with 100% progress, finishing in December 2024. The Finance Dashboard is a pending task set for early 2025 with no progress yet. The Healthcare System Mobile App is 80% complete, aiming to finish by December 2024, with Olivia Clark, James Green, and Clara Peterson on the team. The Social Media Analytics Tool will begin in February 2025, with Daniel Zhao and Nina Patel working on it.</p>
              <div className="bg-gray-100 w-full border border-1"></div>
              <div> 
                <h2 className="mb-6"> Attachments</h2>
                <div className="flex flex-col gap-5">
                  <ListItem icon = {attachment} content = "Img343621.png" item={deleteIcon}/>
                  <ListItem icon = {attachment} content = "Img343621.png" item={deleteIcon}/>
                  <ListItem icon = {attachment} content = "Img343621.png" item={deleteIcon}/>
                </div>
              </div>
            </div>
        </div>
        <div className="bg-white h-screen flex flex-col justify-between p-4 flex-1 rounded-md">
      <div> {/* Messages Container */}
        <div className="text-xl font-bold mb-4">Assistant</div>
        <hr className="mb-4 border-gray-300" />
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 w-fit max-w-[350px] ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white ml-auto text-right rounded-t-lg rounded-l-lg '
                  : 'bg-gray-200 text-gray-100 mr-auto shadow text-left rounded-t-lg rounded-r-lg'
              }`}
            >
              {message.text}
              <div className="text-xs text-white mt-1 text-right">12:05 AM</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center bg-white px-2 py-4 rounded-md shadow">
        <input
          type="text"
          placeholder="Write here"
          className="flex-grow outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage} className="text-gray-500 hover:text-gray-700">
          <img src={sendIcon} />
        </button>
      </div>
    </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
