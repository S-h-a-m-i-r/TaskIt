
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CreditsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [selectedOption, setSelectedOption] = useState("Add Credits")
  const navigate = useNavigate()
  // Close dropdown when clicking outside
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

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    navigate('/credits')
    // Add your logic here for handling the selected option
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <span className="text-sm font-medium">{selectedOption}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={() => handleOptionClick("Add Credits")}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            Add Credits
          </button>
          <button
            onClick={() => handleOptionClick("Remove Credits")}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
          >
            Remove Credits
          </button>
        </div>
      )}
    </div>
  )
}
