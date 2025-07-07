"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, LogOut, User, Settings, UserRound, Store } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { message, Modal } from "antd"
interface ProfileDropdownProps {
  userName?: string
  userAvatar?: string
}

export default function ProfileDropdown({
  userName = "Admin",
  userAvatar = "https://static.vecteezy.com/system/resources/previews/018/931/665/non_2x/black-user-icon-png.png",
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
const [isModalOpen, setIsModalOpen] = useState(false);
const navigate = useNavigate();  

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  

  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    message.success('logged out successfully!');
    navigate('/login')
};

  const handleProfile = () => {
    navigate('/profile')
    // Add your profile navigation logic here
  }

  const handleSettings = () => {
    navigate('/admin/settings')
    // Add your settings navigation logic here
  }
const userRole = localStorage.getItem('role')

const handleRoute = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
  e?.stopPropagation();
  e?.preventDefault();
  const target = e?.target as HTMLButtonElement;
  if (target?.id === 'aboutUs') {
    navigate('/aboutUs');
  } else {
    navigate('/contactUs');
  }
  setIsOpen(false);
}
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={userAvatar || "/placeholder.svg"}
            alt={`${userName}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Greeting Text */}
        <span className="text-gray-700 font-medium text-sm">Hello {userName}</span>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* Profile Option */}
          <button
            onClick={handleProfile}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            <User className="w-4 h-4 text-gray-500" />
            View Profile
          </button>

          {/* Settings Option */}
          {userRole === 'admin' && 
          <button
            onClick={handleSettings}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            Settings
          </button>
          }
          <button
          id='contactus'
            onClick={(e) => handleRoute(e)}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            <UserRound className="w-4 h-4 text-gray-500" />
            Contact Us
          </button>
          <button
            onClick={(e) => handleRoute(e)}
            id='aboutUs'
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            <Store className="w-4 h-4 text-gray-500" />
            About Us
          </button>

          {/* Divider */}
          <div className="border-t border-gray-100 my-1"></div>

          {/* Logout Option */}
          <button
            onClick={() => {setIsModalOpen(true)}}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Logout
          </button>
        </div>
      )}
      <Modal
								open={isModalOpen}
								closable={true}
								cancelText="Cancel"
								okText="Logout"
								onCancel={() => {setIsModalOpen(false)}}
								onOk={handleLogoutClick}
								centered={true}
								style={{ height: "250px" }}
								okButtonProps={{
									style: {
									  backgroundColor: '#EF4444', // Red-500
									  borderColor: '#EF4444',
									  color: '#fff',
									},
								  }}
							>
								<p className="text-lg font-semibold text-gray-600 text-center py-10">Are you sure you want to logout?</p>
							</Modal>
    </div>
  )
}
