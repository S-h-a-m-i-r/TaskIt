import ButtonComponent from '../../generalComponents/ButtonComponent'
import TaskTable from '../../../pages/admin/TaskTable'
import { teamManagmentTableDetails, teamManangementHeader } from '../../../datadump'
import { Link } from 'react-router-dom';
import ProfileDropdown from '../../generalComponents/ProfileButton';

const AdminTeamManagement = () => {
  const name = localStorage.getItem('role') || ''
	return (
		<div>
			<div className="w-full flex items-center justify-between ">
				<h2 className="mt-10 text-[32px] text-left font-bold text-gray-900 mb-2 pl-3">Team Managment</h2>
				<div className='flex gap-2 items-center'>
				<Link to= '/admin/addTeam'>
                <ButtonComponent
					title="Add Team Member"
					className="bg-[#EBEDF2] text-black px-2 py-2 rounded-md hover:bg-[#EBEDF2] transition-all w-[200px] h-[48px]"
				/>
                </Link>
				<ProfileDropdown userName={name}/>
				</div>
			</div>
			<div>
				<TaskTable tasks={teamManagmentTableDetails} tasksHeader={teamManangementHeader} />
			</div>
		</div>
	);
}

export default AdminTeamManagement
