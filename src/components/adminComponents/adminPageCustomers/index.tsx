import { useEffect, useRef, useState } from 'react';
import TaskTable from '../../../pages/admin/TaskTable'
import { Search, ChevronDown } from 'lucide-react';
import ProfileDropdown from '../../generalComponents/ProfileButton';
import useAuthStore from '../../../stores/authStore';
import useCreditsStore from '../../../stores/creditsStore';
import { transformCustomersDataForAdminTable, adminCustomersTableHeaders } from '../../../utils/creditsDataTransform';

const AdminPageCustomers = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, string>
	>({});

	// Credits store for customer data
	const { 
		customers, 
		customersLoading, 
		customersError, 
		fetchCustomers, 
		resetCustomersError 
	} = useCreditsStore();

	const filterOptions = {
		'Plan Type': ['10_CREDITS', 'UNLIMITED'],
		'Account Status': ['Active', 'Inactive', 'Suspended', 'Pending'],
		'Credit Range': ['<3 Credits', '3-10 Credits', '10-50 Credits', '50+ Credits'],
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

	const clearFilters = () => {
		setSelectedFilters({});
		setSearchQuery('');
	};
	// Fetch customers data on component mount
	useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);

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

	const { user } = useAuthStore();

	// Transform the data for the table
	const transformedCustomersData = transformCustomersDataForAdminTable(customers);

	// Filter customers based on search query and dropdown filters
	const filteredCustomersData = transformedCustomersData.filter((customer) => {
		// Search filter
		const searchLower = searchQuery.toLowerCase();
		const matchesSearch = searchQuery === '' || (
			customer.name.toLowerCase().includes(searchLower) ||
			customer.customerEmail.toLowerCase().includes(searchLower) ||
			customer.customerId.toLowerCase().includes(searchLower)
		);

		// Plan Type filter
		const matchesPlanType = !selectedFilters['Plan Type'] || 
			customer.plan === selectedFilters['Plan Type'];

		// Credits filter
		const matchesCredits = !selectedFilters['Credit Range'] || (() => {
			const credits = parseInt(customer.customerCreditsRemaining);
			const filter = selectedFilters['Credit Range'];
			
			switch (filter) {
				case '<3 Credits':
					return credits < 3;
				case '3-10 Credits':
					return credits >= 3 && credits <= 10;
				case '10-50 Credits':
					return credits > 10 && credits <= 50;
				case '50+ Credits':
					return credits > 50;
				default:
					return true;
			}
		})();

		// Account Status filter (default to Active since we don't have real status data)
		const matchesStatus = !selectedFilters['Account Status'] || 
			selectedFilters['Account Status'] === 'Active';

		return matchesSearch && matchesPlanType && matchesCredits && matchesStatus;
	});

	return (
		<>
			<div className="mt-10 mb-5 flex justify-between items-center">
				<h2 className=" text-[32px] text-left font-bold text-gray-900 mb-2">
					Customers
				</h2>
				<ProfileDropdown userName={user?.userName} />
			</div>
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
				<div className="flex flex-wrap gap-4 items-center">
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
					
					{/* Clear Filters Button */}
					{(Object.keys(selectedFilters).length > 0 || searchQuery) && (
						<button
							onClick={clearFilters}
							className="px-4 py-3 bg-gray-300 text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-white transition-all text-sm font-medium"
						>
							Clear All Filters
						</button>
					)}
				</div>

				{/* Active Filters Summary */}
				{(Object.keys(selectedFilters).length > 0 || searchQuery) && (
					<div className="flex flex-wrap gap-2 items-center">
						<span className="text-sm text-gray-600">Active filters:</span>
						{searchQuery && (
							<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
								Search: "{searchQuery}"
							</span>
						)}
						{Object.entries(selectedFilters).map(([filter, value]) => (
							<span key={filter} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
								{filter}: {value}
							</span>
						))}
					</div>
				)}
			</div>
			<div className="mt-4 mb-2 flex justify-between items-center">
				<div>
					<h2 className="text-2xl text-left font-semibold text-gray-900">
						Customer Credit Table
					</h2>
					<p className="text-sm text-gray-600 mt-1">
						Showing {filteredCustomersData.length} of {transformedCustomersData.length} customers
					</p>
				</div>
				<button
					onClick={fetchCustomers}
					disabled={customersLoading}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
				>
					{customersLoading ? (
						<>
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							Refreshing...
						</>
					) : (
						<>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							Refresh Data
						</>
					)}
				</button>
			</div>

			{/* Error handling */}
			{customersError && (
				<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
					<div className="flex justify-between items-center">
						<p className="text-red-600">{customersError}</p>
						<button 
							onClick={resetCustomersError}
							className="text-red-600 hover:text-red-800 underline"
						>
							Dismiss
						</button>
					</div>
				</div>
			)}

			{/* Loading state */}
			{customersLoading ? (
				<div className="flex justify-center items-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					<span className="ml-2 text-gray-600">Loading customers data...</span>
				</div>
			) : (
				<TaskTable
					tasks={filteredCustomersData}
					tasksHeader={adminCustomersTableHeaders}
				/>
			)}
		</>
	);
};

export default AdminPageCustomers
