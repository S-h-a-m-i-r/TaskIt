import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function CreditOverviewDashboard() {
	const [searchQuery, setSearchQuery] = useState("");
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

	const statsCards = [
		{
			title: "Total Credits Issued",
			value: "12,500",
		},
		{
			title: "Credits Used This Month",
			value: "2,300",
		},
		{
			title: "Credits Remaining",
			value: "10,200",
		},
		{
			title: "Credits Expiring Soon",
			value: "500",
		},
	];

	const filterOptions = {
		"Plan Type": ["Basic", "Premium", "Enterprise", "Trial"],
		"Credits Remaining": ["0-100", "101-500", "501-1000", "1000+"],
		"Expiry Date Range": ["Next 7 days", "Next 30 days", "Next 90 days", "Custom Range"],
		"Date of Issuance": ["Last 7 days", "Last 30 days", "Last 90 days", "Custom Range"],
		Status: ["Active", "Expired", "Pending", "Suspended"],
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
		<div className="w-full mx-auto py-6 bg-transparent">
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
				{statsCards.map((card, index) => (
					<div
						key={index}
						className="bg-transparent border border-gray-300 rounded-xl p-6 min-h-[136px] hover:shadow-sm transition-shadow"
					>
						<div className="space-y-2">
							<h3 className="text-sm text-left font-medium text-gray-600 leading-tight">{card.title}</h3>
							<p className="text-3xl text-left font-semibold text-gray-900">{card.value}</p>
						</div>
					</div>
				))}
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
				<div className="flex flex-wrap gap-4">
					{Object.entries(filterOptions).map(([filter, options]) => (
						<div key={filter} className="relative" ref={(el) => (dropdownRefs.current[filter] = el)}>
							<button
								onClick={() => toggleDropdown(filter)}
								className={`inline-flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all min-w-[140px] ${
									openDropdown === filter
										? "bg-blue-50 border-blue-200 text-blue-700"
										: selectedFilters[filter]
										? "bg-gray-300 border-gray-300 text-gray-900"
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
		</div>
	);
}
