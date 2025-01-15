import inprogress_icon from "../../assets/icons/Inprogress_icon.svg";
import submitted_icon from "../../assets/icons/submitted_icon.svg";
import closed_icon from "../../assets/icons/closed_icon.svg";
import recurring_icon from "../../assets/icons/recurring_icon.svg"

export const CardsData = [
  { title: "Tasks in progress", percent: 3.5, count: 520, icon: {inprogress_icon}, path: '/inProgress'},
  { title: "Tasks submitted", percent: 8.5, count: 66, icon: {submitted_icon}, path: '/submitted'},
  { title: "Tasks closed", percent: 16, count: 441, icon: {closed_icon}, path: '/closed'},
  { title: "Recurring Tasks", percent: 7, count: 33, icon: {recurring_icon}, path: '/recurring'},
];

export const TasksHeadersData = [
  'Name', 'Task Id', 'Date', 'Status', 'Actions', 'Recurring'
]

export const tasksBodyData = [
  { name: 'Book Reading', task_id: '21', Date: '23rd Dec 2024', status: 'In Progress', date: '2023-10-01', action: 'completed', Recurring: 'No' },
  { name: 'Project Meeting', task_id: '22', Date: '24th Dec 2024', status: 'closed', date: '2023-10-02', action: 'closed', Recurring: 'Yes' },
  { name: 'Code Review', task_id: '23', Date: '25th Dec 2024', status: 'Completed', date: '2023-10-03', action: 'completed', Recurring: 'No' },
  { name: 'Design Update', task_id: '24', Date: '26th Dec 2024', status: 'In Progress', date: '2023-10-04', action: 'in progress', Recurring: 'Yes' },
  { name: 'Client Call', task_id: '25', Date: '27th Dec 2024', status: 'closed', date: '2023-10-05', action: 'pending', Recurring: 'No' },
  { name: 'Team Lunch', task_id: '26', Date: '28th Dec 2024', status: 'Completed', date: '2023-10-06', action: 'completed', Recurring: 'Yes' },
  { name: 'Sprint Planning', task_id: '27', Date: '29th Dec 2024', status: 'In Progress', date: '2023-10-07', action: 'in progress', Recurring: 'No' },
  
];