import { useEffect, useRef, useState } from 'react';
import { adminpageCustomerDetails, adminpageCustomerHeader } from '../../datadump'
import TaskTable from '../../pages/admin/TaskTable'
import { Search, ChevronDown } from 'lucide-react';

const AdminPageCustomers = () => {
        const [searchQuery, setSearchQuery] = useState("");
        const [openDropdown, setOpenDropdown] = useState<string | null>(null);
        const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
        const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});    
    
        const filterOptions = {
            "Plan Type": ["Basic", "Premium", "Enterprise", "Trial"],
            "Account Status": ["Active", "Inactive", "Suspended", "Pending"],
            "Low Credit(< 3 Credits)": ["<3 Credits", "3-10 Credits", "10+ Credits"],
            "Last Login": ["Last 7 days", "Last 30 days", "Last 90 days"],
        };
    
        const toggleDropdown = (filter: string) => {
            setOpenDropdown(openDropdown === filter ? null : filter);
        };
    
        const handleOptionSelect = (filter: string, option: string) => {
            setSelectedFilters((prev) => ({
                ...prev,
                [filter]: option,
            }));
            setOpenDropdown(null);
        };
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    openDropdown &&
                    dropdownRefs.current[openDropdown] &&
                    !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
                ) {
                    setOpenDropdown(null);
                }
            };
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [openDropdown]);
  return (
    <>
     <h2 className='mt-10 text-[32px] text-left font-bold text-gray-900 mb-2'>
      Customers
      </h2>
      <div className="space-y-6">

				{/* Search Input */}
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<Search className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by Customer Name/Email/User ID"
						className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-base"
					/>
				</div>

				{/* Filter Buttons with Dropdowns */}
				<div className="flex flex-wrap gap-4">
					{Object.entries(filterOptions).map(([filter, options]) => (
						<div key={filter} className="relative" ref={(el) => (dropdownRefs.current[filter] = el)}>
							<button
								onClick={() => toggleDropdown(filter)}
								className={`inline-flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all min-w-[140px] ${
									openDropdown === filter
										? "bg-blue-50 border-blue-200 text-blue-700"
										: selectedFilters[filter]
										? "bg-gray-300 border-gray-100 text-gray-900"
										: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
								}`}
							>
								<span>{selectedFilters[filter] || filter}</span>
								<ChevronDown
									className={`ml-2 h-4 w-4 transition-transform ${openDropdown === filter ? "rotate-180" : ""}`}
								/>
							</button>

							{openDropdown === filter && (
								<div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-2">
									{options.map((option) => (
										<button
											key={option}
											onClick={() => handleOptionSelect(filter, option)}
											className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
										>
											{option}
										</button>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
      <h2 className="mt-4 mb-2 text-2xl text-left font-semibold text-gray-900">Customer Credit Table</h2>
      <TaskTable tasks={adminpageCustomerDetails} tasksHeader={adminpageCustomerHeader}/> 
    </>
  )
}

export default AdminPageCustomers
