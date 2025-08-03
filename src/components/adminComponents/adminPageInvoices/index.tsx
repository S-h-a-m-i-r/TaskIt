import { useEffect, useRef, useState } from 'react';
import {  adminPageInvoicesDetails, adminPageInvoicesHeader} from '../../../datadump'
import TaskTable from '../../../pages/admin/TaskTable'
import {  ChevronDown } from 'lucide-react';
import ButtonComponent from '../../generalComponents/ButtonComponent';
import ProfileDropdown from '../../generalComponents/ProfileButton';
import useAuthStore from '../../../stores/authStore';

const AdminPageInvoices = () => {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, string>
	>({});
	const { user } = useAuthStore();
	const filterOptions = {
		Date: ['Today', 'Tomorrow', 'this week', 'this month'],
		Task: ['Active', 'Inactive'],
		User: ['Alice', 'Bob', 'John', 'Jane'],
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

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [openDropdown]);

	return (
		<>
			<div className="flex items-center justify-between mt-10 mb-4">
				<h2 className="text-[32px] text-left font-bold text-gray-900 mb-2">
					Invoice Center
				</h2>
				<div className="flex items-center gap-2">
					<ButtonComponent
						title="Generate"
						className="bg-primary-50 text-white text-[14px] px-4 py-2 rounded-md hover:bg-primary-200 transition-all w-[135px]"
					/>
					<ProfileDropdown userName={user?.userName || ''} />
				</div>
			</div>
			<div className="space-y-6">
				{/* Filter Buttons with Dropdowns */}
				<div className="flex flex-wrap gap-4">
					{Object.entries(filterOptions).map(([filter, options]) => (
						<div
							key={filter}
							className="relative"
							ref={(el) => (dropdownRefs.current[filter] = el)}
						>
							<button
								onClick={() => toggleDropdown(filter)}
								className={`inline-flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all min-w-[140px] ${
									openDropdown === filter
										? 'bg-blue-50 border-blue-200 text-blue-700'
										: selectedFilters[filter]
										? 'bg-gray-300 border-gray-100 text-gray-900'
										: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
								}`}
							>
								<span>{selectedFilters[filter] || filter}</span>
								<ChevronDown
									className={`ml-2 h-4 w-4 transition-transform ${
										openDropdown === filter ? 'rotate-180' : ''
									}`}
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
			<h2 className="mt-4 mb-2 text-2xl text-left font-semibold text-gray-900">
				Customer Credit Table
			</h2>
			<TaskTable
				tasks={adminPageInvoicesDetails}
				tasksHeader={adminPageInvoicesHeader}
			/>
		</>
	);
};

export default AdminPageInvoices
