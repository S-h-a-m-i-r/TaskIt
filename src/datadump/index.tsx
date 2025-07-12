import inprogress_icon from "../assets/icons/Inprogress_icon.svg";
import submitted_icon from "../assets/icons/submitted_icon.svg";
import closed_icon from "../assets/icons/closed_icon.svg";
import recurring_icon from "../assets/icons/recurring_icon.svg";

export const adminTaskList = [
	{
		id: "#12345",
		description: "Follow up with customer about recent purchase",
		status: "In Progress",
		assignedTo: "Sarah Miller",
		dueDate: "2024-07-20",
	},
	{
		id: "#12346",
		description: "Review and approve refund request",
		status: "Pending",
		assignedTo: "David Lee",
		dueDate: "2024-07-21",
	},
	{
		id: "#12347",
		description: "Update customer account information",
		status: "Completed",
		assignedTo: "Emily Chen",
		dueDate: "2024-07-19",
	},
	{
		id: "#12348",
		description: "Resolve technical issue reported by customer",
		status: "In Progress",
		assignedTo: "Michael Brown",
		dueDate: "2024-07-22",
	},
	{
		id: "#12349",
		description: "Schedule follow-up call with customer",
		status: "Pending",
		assignedTo: "Jessica Wilson",
		dueDate: "2024-07-23",
	},
];

export const customerTasksdetails = [
	{
		id: "#12345",
		name: "lorem ipsum",
		email: "SarahMillar@gmail.com",
		status: "In Progress",
		dueDate: "2024-07-20",
	},
	{
		id: "#12346",
		name: "lorem ipsum",
		email: "SarahMillar@gmail.com",
		status: "Pending",
		dueDate: "2024-07-21",
	},
	{
		id: "#12347",
		name: "lorem ipsum",
		email: "SarahMillar@gmail.com",
		status: "Completed",
		dueDate: "2024-07-19",
	},
	{
		id: "#12348",
		name: "lorem ipsum",
		email: "SarahMillar@gmail.com",
		status: "In Progress",
		dueDate: "2024-07-22",
	},
	{
		id: "#12349",
		name: "lorem ipsum",
		email: "SarahMillar@gmail.com",
		status: "Pending",
		dueDate: "2024-07-23",
	},
];

export const teamTasksdetails = [
	{
		id: "#12345",
		name: "lorem ipsum",
		role: "User",
		status: "In Progress",
		dueDate: "2024-07-20",
		
	},
	{
		id: "#12346",
		name: "lorem ipsum",
		role: "Admin",
		status: "Pending",
		dueDate: "2024-07-21",
	},
	{
		id: "#12347",
		name: "lorem ipsum",
		role: "User",
		status: "Completed",
		dueDate: "2024-07-19",
	},
	{
		id: "#12348",
		name: "lorem ipsum",
		role: "Manager",
		status: "In Progress",
		dueDate: "2024-07-22",
	},
	{
		id: "#12349",
		name: "lorem ipsum",
		role: "Admin",
		status: "Pending",
		dueDate: "2024-07-23",
	},
];

export const tasksPagedetails = [
	{
		id: "#12345",
		type: 'Support',
		taskStatus: "In Progress",
		dueDate: "2024-07-20",
		Actions: true
	},
	{
		id: "#12346",
		type: 'Admin',
		taskStatus: "Pending",
		dueDate: "2024-07-21",
		actions: true
	},
	{
		id: "#12347",
		type: 'Support',
		taskStatus: "Completed",
		dueDate: "2024-07-19",
		actions: true
	},
	{
		id: "#12348",
		type: 'Admin',
		taskStatus: "In Progress",
		dueDate: "2024-07-22",
		actions: true
	},
	{
		id: "#12349",
		type: 'Admin',
		taskStatus: "Pending",
		dueDate: "2024-07-23",
		actions: true
	},
];

export const creditsPagetaskHeaders =  [
	'customerName',
	'Email',
	'Credits Remaining',
	'Expiring Credits ',
	'Last Top-up Date',
	'actions'
]
export const creditsPagetaskDetails =[
	{
		customerName: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		creditsRemaining: "100",
		expiringCredits: "10",
		lastTopUpDate: "2024-07-20",
		creditsActions: true
	},
	{
		customerName: "Jane Smith",
		customerEmail: "JaneSmith11@gmail.com",
		creditsRemaining: "200",
		expiringCredits: "20",
		lastTopUpDate: "2024-07-21",
		creditsActions: true	

	},
	{
		customerName: "Alice Johnson",
		customerEmail: "AliceJohnson123@gmail.com",
		creditsRemaining: "150",
		expiringCredits: "15",	
		lastTopUpDate: "2024-07-19",
		creditsActions: true
	},
	{
		customerName: "Bob Brown",
		customerEmail: "BobBrown31@gmail.com",
		creditsRemaining: "300",
		expiringCredits: "30",
		lastTopUpDate: "2024-07-22",
		creditsActions: true
	},
	{
		customerName: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		creditsRemaining: "100",
		expiringCredits: "10",
		lastTopUpDate: "2024-07-20",
		creditsActions: true
	},
	{
		customerName: "Jane Smith",
		customerEmail: "JaneSmith11@gmail.com",
		creditsRemaining: "200",
		expiringCredits: "20",
		lastTopUpDate: "2024-07-21",
		creditsActions: true	

	},
	{
		customerName: "Alice Johnson",
		customerEmail: "AliceJohnson123@gmail.com",
		creditsRemaining: "150",
		expiringCredits: "15",	
		lastTopUpDate: "2024-07-19",
		creditsActions: true
	},
	{
		customerName: "Bob Brown",
		customerEmail: "BobBrown31@gmail.com",
		creditsRemaining: "300",
		expiringCredits: "30",
		lastTopUpDate: "2024-07-22",
		creditsActions: true
	},{
		customerName: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		creditsRemaining: "100",
		expiringCredits: "10",
		lastTopUpDate: "2024-07-20",
		creditsActions: true
	},
	{
		customerName: "Jane Smith",
		customerEmail: "JaneSmith11@gmail.com",
		creditsRemaining: "200",
		expiringCredits: "20",
		lastTopUpDate: "2024-07-21",
		creditsActions: true	

	},
	{
		customerName: "Alice Johnson",
		customerEmail: "AliceJohnson123@gmail.com",
		creditsRemaining: "150",
		expiringCredits: "15",	
		lastTopUpDate: "2024-07-19",
		creditsActions: true
	},
	{
		customerName: "Bob Brown",
		customerEmail: "BobBrown31@gmail.com",
		creditsRemaining: "300",
		expiringCredits: "30",
		lastTopUpDate: "2024-07-22",
		creditsActions: true
	},{
		customerName: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		creditsRemaining: "100",
		expiringCredits: "10",
		lastTopUpDate: "2024-07-20",
		creditsActions: true
	},
	{
		customerName: "Jane Smith",
		customerEmail: "JaneSmith11@gmail.com",
		creditsRemaining: "200",
		expiringCredits: "20",
		lastTopUpDate: "2024-07-21",
		creditsActions: true	

	},
	{
		customerName: "Alice Johnson",
		customerEmail: "AliceJohnson123@gmail.com",
		creditsRemaining: "150",
		expiringCredits: "15",	
		lastTopUpDate: "2024-07-19",
		creditsActions: true
	},
	{
		customerName: "Bob Brown",
		customerEmail: "BobBrown31@gmail.com",
		creditsRemaining: "300",
		expiringCredits: "30",
		lastTopUpDate: "2024-07-22",
		creditsActions: true
	},
]

export const customerHeader = ["Customer Id", "Name", "Email", "Status", "Last Interaction"];

export const teamHeader = ["User Id", "Name", "Role", "Status", "Last Login"];
export const tasksHeader = ["Task Id", "Description", "Status", "Assigned To", "Due Date"];

export const CardsData = [
	{
		title: "Tasks in progress",
		percent: 3.5,
		count: 520,
		icon: inprogress_icon,
		path: "/inProgress",
		color: "#FFFBEB",
	},
	{ title: "Tasks submitted", percent: 8.5, count: 66, icon: submitted_icon, path: "/submitted", color: "#EFF6FF" },
	{ title: "Tasks closed", percent: 16, count: 441, icon: closed_icon, path: "/closed", color: "#FEF2F2" },
	{ title: "Recurring Tasks", percent: 7, count: 33, icon: recurring_icon, path: "/recurring" },
];

export const TasksHeadersData = [
	"Name",
	"Task Id",
	"Date",
	"Status",
	"Recurring",
];

export const adminTasksHeadersData = [
	"Name",
	"date_joined",
	"Task Made",
	"Total Credits",
	"Remaining Credits",
	"Amount",
	"Action",
];

export const tasksBodyData = [
	{
		name: "Book Reading",
		task_id: "21",
		Date: "23rd Dec 2024",
		status: "In Progress",
		date: "2023-10-01",
		action: "completed",
		Recurring: "No",
	},
	{
		name: "Project Meeting",
		task_id: "22",
		Date: "24th Dec 2024",
		status: "Task Closed",
		date: "2023-10-02",
		action: "closed",
		Recurring: "Yes",
	},
	{
		name: "Code Review",
		task_id: "23",
		Date: "25th Dec 2024",
		status: "Completed",
		date: "2023-10-03",
		action: "completed",
		Recurring: "No",
	},
	{
		name: "Design Update",
		task_id: "24",
		Date: "26th Dec 2024",
		status: "In Progress",
		date: "2023-10-04",
		action: "in progress",
		Recurring: "Yes",
	},
	{
		name: "Client Call",
		task_id: "25",
		Date: "27th Dec 2024",
		status: "Task Closed",
		date: "2023-10-05",
		action: "pending",
		Recurring: "No",
	},
	{
		name: "Team Lunch",
		task_id: "26",
		Date: "28th Dec 2024",
		status: "Completed",
		date: "2023-10-06",
		action: "completed",
		Recurring: "Yes",
	},
	{
		name: "Sprint Planning",
		task_id: "27",
		Date: "29th Dec 2024",
		status: "In Progress",
		date: "2023-10-07",
		action: "in progress",
		Recurring: "No",
	},
];

export const adminTasksBodyData = [
	{
		name: "John Doe",
		date_joined: "3rd Feb 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "Susie Smith",
		date_joined: "31 Jul 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "William Jane",
		date_joined: "28 Oct 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "Ketty Wilson",
		date_joined: "22nd Jan 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "John Doe",
		date_joined: "2nd Sep 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "CTR",
		date_joined: "22nd Feb 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "John Doe",
		date_joined: "22nd March 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
	{
		name: "J. Sparrow",
		date_joined: "1st Dec 2025",
		task_made: "27",
		total_credits: "100",
		remaining_credits: "92",
		amount: "$75",
		actions: "No",
	},
];

export const adminpageCustomerHeader = [
	'Name',
	"Email",
	'Phone',
	'Plan',
	'Credits Remaining',
	'status',
	'Last Login',
	''
]
export const adminpageCustomerDetails = [
	{
		name: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		phone: "1234567890",
		plan: "Basic",
		customerCredits: "92",
		customerStatus: "Active",
		customerLastLogin: "2024-07-20",
		customerActions: true
	},
	{
		name: "Jane Smith",
		customerEmail: "janeSmith@gmail.com",
		phone: "1234567890",
		plan: "Premium",
		customerCredits: "200",
		customerStatus: "Active",
		customerLastLogin: "2024-07-21",
		customerActions: true
	},
	{
		name: "Alice Johnson",
		customerEmail: "aliceJohnson231@gmail.com",
		phone: "1234567890",
		plan: "Enterprise",
		customerCredits: "150",
		customerStatus: "Active",
		customerLastLogin: "2024-07-19",
		customerActions: true
	},
	{
		name: "Bob Brown",
		customerEmail: "bobBrown121@gmail.com",
		phone: "1234567890",
		plan: "Trial",
		customerCredits: "300",
		customerStatus: "Active",
		customerLastLogin: "2024-07-22",
		customerActions: true
	},
	{
		name: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		phone: "1234567890",
		plan: "Basic",
		customerCredits: "92",
		customerStatus: "Active",
		customerLastLogin: "2024-07-20",
		customerActions: true
	},
	{
		name: "Jane Smith",
		customerEmail: "janeSmith@gmail.com",
		phone: "1234567890",
		plan: "Premium",
		customerCredits: "200",
		customerStatus: "Active",
		customerLastLogin: "2024-07-21",
		customerActions: true
	},
	{
		name: "Alice Johnson",
		customerEmail: "aliceJohnson231@gmail.com",
		phone: "1234567890",
		plan: "Enterprise",
		customerCredits: "150",
		customerStatus: "Active",
		customerLastLogin: "2024-07-19",
		customerActions: true
	},
	{
		name: "Bob Brown",
		customerEmail: "bobBrown121@gmail.com",
		phone: "1234567890",
		plan: "Trial",
		customerCredits: "300",
		customerStatus: "Active",
		customerLastLogin: "2024-07-22",
		customerActions: true
	},{
		name: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		phone: "1234567890",
		plan: "Basic",
		customerCredits: "92",
		customerStatus: "Active",
		customerLastLogin: "2024-07-20",
		customerActions: true
	},
	{
		name: "Jane Smith",
		customerEmail: "janeSmith@gmail.com",
		phone: "1234567890",
		plan: "Premium",
		customerCredits: "200",
		customerStatus: "Active",
		customerLastLogin: "2024-07-21",
		customerActions: true
	},
	{
		name: "Alice Johnson",
		customerEmail: "aliceJohnson231@gmail.com",
		phone: "1234567890",
		plan: "Enterprise",
		customerCredits: "150",
		customerStatus: "Active",
		customerLastLogin: "2024-07-19",
		customerActions: true
	},
	{
		name: "Bob Brown",
		customerEmail: "bobBrown121@gmail.com",
		phone: "1234567890",
		plan: "Trial",
		customerCredits: "300",
		customerStatus: "Active",
		customerLastLogin: "2024-07-22",
		customerActions: true
	},{
		name: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		phone: "1234567890",
		plan: "Basic",
		customerCredits: "92",
		customerStatus: "Active",
		customerLastLogin: "2024-07-20",
		customerActions: true
	},
	{
		name: "Jane Smith",
		customerEmail: "janeSmith@gmail.com",
		phone: "1234567890",
		plan: "Premium",
		customerCredits: "200",
		customerStatus: "Active",
		customerLastLogin: "2024-07-21",
		customerActions: true
	},
	{
		name: "Alice Johnson",
		customerEmail: "aliceJohnson231@gmail.com",
		phone: "1234567890",
		plan: "Enterprise",
		customerCredits: "150",
		customerStatus: "Active",
		customerLastLogin: "2024-07-19",
		customerActions: true
	},
	{
		name: "Bob Brown",
		customerEmail: "bobBrown121@gmail.com",
		phone: "1234567890",
		plan: "Trial",
		customerCredits: "300",
		customerStatus: "Active",
		customerLastLogin: "2024-07-22",
		customerActions: true
	},{
		name: "John Doe",
		customerEmail: "JohnDoe11@gmail.com",
		phone: "1234567890",
		plan: "Basic",
		customerCredits: "92",
		customerStatus: "Active",
		customerLastLogin: "2024-07-20",
		customerActions: true
	},
	{
		name: "Jane Smith",
		customerEmail: "janeSmith@gmail.com",
		phone: "1234567890",
		plan: "Premium",
		customerCredits: "200",
		customerStatus: "Active",
		customerLastLogin: "2024-07-21",
		customerActions: true
	},
	{
		name: "Alice Johnson",
		customerEmail: "aliceJohnson231@gmail.com",
		phone: "1234567890",
		plan: "Enterprise",
		customerCredits: "150",
		customerStatus: "Active",
		customerLastLogin: "2024-07-19",
		customerActions: true
	},
	{
		name: "Bob Brown",
		customerEmail: "bobBrown121@gmail.com",
		phone: "1234567890",
		plan: "Trial",
		customerCredits: "300",
		customerStatus: "Active",
		customerLastLogin: "2024-07-22",
		customerActions: true
	},


]

export const adminPageInvoicesHeader = [
	'Invoice Number',
	'User',
	'Amount',
	"Date",
	"Payment Method",
	'Actions'
]
export const adminPageInvoicesDetails = [
{
	invoiceNumber: "INV001",
	user: "John Doe",
	invoiceAmount: "$100",
	invoiceDate: "2024-07-20",
	invoicePaymentMethod: "Credit Card",
	invoiceActions: true
},
{
	invoiceNumber: "INV002",
	user: "Jane Smith",
	invoiceAmount: "$200",
	invoiceDate: "2024-07-21",
	invoicePaymentMethod: "PayPal",
	invoiceActions: true
},
{
	invoiceNumber: "INV003",	
	user: "Alice Johnson",
	invoiceAmount: "$150",
	invoiceDate: "2024-07-19",
	invoicePaymentMethod: "Bank Transfer",
	invoiceActions: true
},
{
	invoiceNumber: "INV004",
	user: "Bob Brown",	
	invoiceAmount: "$250",
	invoiceDate: "2024-07-22",
	invoicePaymentMethod: "Credit Card",
	invoiceActions: true
},
{
	invoiceNumber: "INV005",
	user: "Charlie Davis",
	invoiceAmount: "$300",
	invoiceDate: "2024-07-23",
	invoicePaymentMethod: "PayPal",
	invoiceActions: true
},
{
	invoiceNumber: "INV006",
	user: "David Miller",
	invoiceAmount: "$400",
	invoiceDate: "2024-07-24",
	invoicePaymentMethod: "Bank Transfer",
	invoiceActions: true
},
{
	invoiceNumber: "INV007",
	user: "Emily Taylor",
	invoiceAmount: "$350",
	invoiceDate: "2024-07-25",
	invoicePaymentMethod: "Credit Card",
	invoiceActions: true
	},
{
	invoiceNumber: "INV008",
	user: "Franklin White",
	invoiceAmount: "$450",
	invoiceDate: "2024-07-26",
	invoicePaymentMethod: "PayPal",
	invoiceActions: true
	},
{
	invoiceNumber: "INV009",
	user: "Grace Green",
	invoiceAmount: "$500",
	invoiceDate: "2024-07-27",
	invoicePaymentMethod: "Bank Transfer",
	invoiceActions: true
	},
{	
	invoiceNumber: "INV010",
	user: "Hannah Brown",
	invoiceAmount: "$550",	
	invoiceDate: "2024-07-28",
	invoicePaymentMethod: "Credit Card",
	invoiceActions: true
	},
]


export const teamManangementHeader = [
	'Name',
	'Email',
	'Role',
	'Team memeber Count',
	'Actions'
]

export const teamManagmentTableDetails = [
	{
		teamManagementName: "John Doe",
		teamManagementEmail: "john.doe@example.com",
		teamManagementRole: "Team Lead",
		teamManagementTeamMemberCount: 5,
		teamManagementActions: true
	},

	{
		teamManagementName: "Jane Doe",
		teamManagementEmail: "jane.doe@example.com",
		teamManagementRole: "Team Member",
		teamManagementTeamMemberCount: 3,
		teamManagementActions: true
	},
	{
		teamManagementName: "John Smith",
		teamManagementEmail: "john.smith@example.com",
		teamManagementRole: "Team Lead",
		teamManagementTeamMemberCount: 7,
		teamManagementActions: true
		},
		{
			teamManagementName: "Jane Smith",
			teamManagementEmail: "jane.smith@example.com",
			teamManagementRole: "Team Member",
			teamManagementTeamMemberCount: 2,
			teamManagementActions: true
			},
			{
				teamManagementName: "John Doe",
				teamManagementEmail: "john.doe@example.com",
				teamManagementRole: "Team Lead",
				teamManagementTeamMemberCount: 5,
				teamManagementActions: true
			},
			{
				teamManagementName: "John Smith",
				teamManagementEmail: "john.smith@example.com",
				teamManagementRole: "Team Lead",
				teamManagementTeamMemberCount: 7,
				teamManagementActions: true
				},
				{
					teamManagementName: "Jane Smith",
					teamManagementEmail: "jane.smith@example.com",
					teamManagementRole: "Team Member",
					teamManagementTeamMemberCount: 2,
					teamManagementActions: true
					},
			
]

export const  statsCards = [
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

export const  dashboardCards = [
	{
		title: "Total Tasks",
		value: "125",
	},
	{
		title: "Credits Balance",
		value: "$2,300",
	},
	{
		title: "Refunds Processed",
		value: "32",
	},
	{
		title: "Active Customers",
		value: "500",
	},
];