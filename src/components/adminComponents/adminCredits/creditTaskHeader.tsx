import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import useCreditsStore from "../../../stores/creditsStore";

interface CreditTaskHeaderProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedFilters: Record<string, string>;
	setSelectedFilters: (filters: Record<string, string>) => void;
	onClearFilters: () => void;
}

export default function CreditOverviewDashboard({ 
	searchQuery, 
	setSearchQuery, 
	selectedFilters, 
	setSelectedFilters, 
	onClearFilters 
}: CreditTaskHeaderProps) {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const { statistics, statisticsLoading, statisticsError, fetchStatistics } = useCreditsStore()
	const filterOptions = {
		'Credit Remaining': ['<5 Credits', '5-20 Credits', '20-50 Credits', '50+ Credits'],
		'Date of Issuance': ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 6 months'],
	};

	const toggleDropdown = (filter: string) => {
		setOpenDropdown(openDropdown === filter ? null : filter);
	};

	const handleOptionSelect = (filter: string, option: string) => {
		const newFilters = { ...selectedFilters, [filter]: option };
		setSelectedFilters(newFilters);
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

	// Fetch statistics on component mount
	useEffect(() => {
		fetchStatistics();
	}, [fetchStatistics]);

	const statsCards = statistics ? [
		{
			title: "Total Credits Used",
			value: statistics.totalCreditsUsed.toLocaleString(),
		},
		{
			title: "Credits Used This Month",
			value: statistics.creditsUsedThisMonth.toLocaleString(),
		},
		{
			title: "Remaining Credits Overall",
			value: statistics.remainingCreditsOverall.toLocaleString(),
		},
		{
			title: "Expiring Credits Soon",
			value: statistics.expiringCreditsSoon.toLocaleString(),
		},
	] : [];

	return (
		<div className="w-full mx-auto py-6 bg-transparent">
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
			{statisticsLoading ? (
					// Loading state
					Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="bg-transparent border border-gray-300 rounded-xl p-6 min-h-[136px] animate-pulse"
						>
							<div className="space-y-2">
								<div className="h-4 bg-gray-200 rounded w-3/4"></div>
								<div className="h-8 bg-gray-200 rounded w-1/2"></div>
							</div>
						</div>
					))
				) : statisticsError ? (
					// Error state
					<div className="col-span-full bg-red-50 border border-red-200 rounded-xl p-6">
						<div className="text-center">
							<p className="text-red-600 font-medium">Failed to load credit statistics</p>
							<p className="text-red-500 text-sm mt-1">{statisticsError}</p>
							<button
								onClick={() => fetchStatistics()}
								className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
							>
								Retry
							</button>
						</div>
					</div>
				) : (
					// Success state
					statsCards.map((card, index) => (
						<div
							key={index}
							className="bg-transparent border border-gray-300 rounded-xl p-6 min-h-[136px] hover:shadow-sm transition-shadow"
						>
							<div className="space-y-2">
								<h3 className="text-sm text-left font-medium text-gray-600 leading-tight">{card.title}</h3>
								<p className="text-3xl text-left font-semibold text-gray-900">{card.value}</p>
							</div>
						</div>
					))
				)}
			</div>

			{/* Search & Filter Section */}
			<div className="space-y-6">
				<h2 className="text-2xl text-left font-semibold text-gray-900">Search & Filter</h2>

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
						<div key={filter} className="relative" ref={(el) => (dropdownRefs.current[filter] = el)}>
							<button
								onClick={() => toggleDropdown(filter)}
								className={`inline-flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all min-w-[140px] ${
									openDropdown === filter
										? "bg-blue-50 border-blue-200 text-blue-700"
										: selectedFilters[filter]
										? "bg-primary-50 border-gray-300 text-white"
										: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
								}`}
							>
								<span>{selectedFilters[filter] || filter}</span>
								<ChevronDown
									className={`ml-2 h-4 w-4 transition-transform ${openDropdown === filter ? "rotate-180" : ""}`}
								/>
							</button>

							{openDropdown === filter && (
								<div className="absolute z-50 top-full left-0 mt-2 w-full min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg py-2">
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
							onClick={onClearFilters}
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
		</div>
	);
}
