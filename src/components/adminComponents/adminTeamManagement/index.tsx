import ButtonComponent from '../../generalComponents/ButtonComponent'
import TaskTable from '../../../pages/admin/TaskTable'
import { Link } from 'react-router-dom';
import ProfileDropdown from '../../generalComponents/ProfileButton';
import useAuthStore from '../../../stores/authStore';
import useUserStore from '../../../stores/userStore';
import { useEffect } from 'react';

const AdminTeamManagement = () => {
	const { user } = useAuthStore();
	const { teamMembers, getAllTeamMembers, loading } = useUserStore();

	useEffect(() => {
		getAllTeamMembers();
	}, [getAllTeamMembers]);

	// Transform team members data for the table
	const teamMembersTableData = teamMembers.map((member) => ({
		_id: member._id, // Add the _id for edit functionality
		teamManagementName: `${member.firstName} ${member.lastName}`,
		teamManagementEmail: member.email,
		teamManagementRole: member.role,
		teamManagementTeamMemberCount: member.userName,
		teamManagementActions: true
	}));

	const teamManagementHeader = [
		'Team Member Name',
		'Team Member Email', 
		'Team Member Role',
		'Team Member Username',
		'Team Member Actions',
	];

	return (
		<div>
			<div className="w-full flex items-center justify-between ">
				<h2 className="mt-10 text-[32px] text-left font-bold text-gray-900 mb-2 pl-3">
					Team Management
				</h2>
				<div className="flex gap-2 items-center">
					<Link to="/admin/addTeam">
						<ButtonComponent
							title="Add Team Member"
							className="bg-primary-50 text-white px-2 py-2 rounded-md hover:bg-primary-200 transition-all w-[200px] h-[48px]"
						/>
					</Link>
					<ProfileDropdown userName={user?.userName || ''} />
				</div>
			</div>
			<div>
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="text-lg">Loading team members...</div>
					</div>
				) : (
					<TaskTable
						tasks={teamMembersTableData}
						tasksHeader={teamManagementHeader}
					/>
				)}
			</div>
		</div>
	);
};

export default AdminTeamManagement
