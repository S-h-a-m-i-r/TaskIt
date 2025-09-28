import TaskTable from "../../../pages/admin/TaskTable";
import ProfileDropdown from "../../generalComponents/ProfileButton";
import CreditTaskHeader from "./creditTaskHeader";
import useAuthStore from '../../../stores/authStore';
import useCreditsStore from '../../../stores/creditsStore';
import { transformCustomersDataForTable, customersTableHeaders } from '../../../utils/creditsDataTransform';
import { useEffect, useState } from 'react';

const AdminCredits = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, string>
	>({});

	const { user } = useAuthStore();
	const { 
		customers, 
		customersLoading, 
		customersError, 
		fetchCustomers, 
		resetCustomersError 
	} = useCreditsStore();

	const clearFilters = () => {
		setSelectedFilters({});
		setSearchQuery('');
	};

	// Fetch customers data on component mount
	useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);

	// Transform the data for the table
	const transformedCustomersData = transformCustomersDataForTable(customers);

	// Filter customers based on search query and dropdown filters
	const filteredCustomersData = transformedCustomersData.filter((customer) => {
		// Search filter
		const searchLower = searchQuery.toLowerCase();
		const matchesSearch = searchQuery === '' || (
			customer.customerName.toLowerCase().includes(searchLower) ||
			customer.customerEmail.toLowerCase().includes(searchLower) ||
			customer.customerId.toLowerCase().includes(searchLower)
		);

		// Credit Remaining filter
		const matchesCredits = !selectedFilters['Credit Remaining'] || (() => {
			const credits = parseInt(customer.customerCreditsRemaining);
			const filter = selectedFilters['Credit Remaining'];
			
			switch (filter) {
				case '<5 Credits':
					return credits < 5;
				case '5-20 Credits':
					return credits >= 5 && credits <= 20;
				case '20-50 Credits':
					return credits > 20 && credits <= 50;
				case '50+ Credits':
					return credits > 50;
				default:
					return true;
			}
		})();

		// Date of Issuance filter (based on last purchase date)
		const matchesDateOfIssuance = !selectedFilters['Date of Issuance'] || (() => {
			if (customer.customerLastTopUpDate === 'Never') return false;
			
			const purchaseDate = new Date(customer.customerLastTopUpDate);
			const now = new Date();
			const daysDiff = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
			const filter = selectedFilters['Date of Issuance'];
			
			switch (filter) {
				case 'Last 7 days':
					return daysDiff <= 7;
				case 'Last 30 days':
					return daysDiff <= 30;
				case 'Last 90 days':
					return daysDiff <= 90;
				case 'Last 6 months':
					return daysDiff <= 180;
				default:
					return true;
			}
		})();

		// Expiring Soon filter
		const matchesExpiringSoon = !selectedFilters['Expiring Soon'] || (() => {
			if (!customer.earliestExpiryDate) return selectedFilters['Expiring Soon'] === 'No expiry soon';
			
			const expiryDate = new Date(customer.earliestExpiryDate);
			const now = new Date();
			const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
			const filter = selectedFilters['Expiring Soon'];
			
			switch (filter) {
				case 'Expires in 7 days':
					return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
				case 'Expires in 30 days':
					return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
				case 'No expiry soon':
					return daysUntilExpiry > 30 || daysUntilExpiry < 0;
				default:
					return true;
			}
		})();

		return matchesSearch && matchesCredits && matchesDateOfIssuance && matchesExpiringSoon;
	});

	return (
		<>
			<div className="mt-10 flex justify-between items-center gap-2">
				<h2 className=" text-[32px] text-left font-bold text-gray-900 mb-2">
					Credits Dashboard
				</h2>
				<ProfileDropdown userName={user?.userName} />
			</div>
			<p className="text-[#5C788A] text-left text-[14px] font-normal mb-4">
				Manage and view customer credits
			</p>
			<div className="mb-8">
				<h1 className="text-2xl text-left font-semibold text-gray-900">
					Current Credit Overview
				</h1>
			</div>
			<CreditTaskHeader 
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				selectedFilters={selectedFilters}
				setSelectedFilters={setSelectedFilters}
				onClearFilters={clearFilters}
			/>

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
                            tasksHeader={customersTableHeaders}
                            onCreditsAdded={fetchCustomers}
                        />
			)}
		</>
	);
};

export default AdminCredits;
