import ButtonComponent from '../../generalComponents/ButtonComponent'
import TaskTable from '../../../pages/admin/TaskTable'
import { teamManagmentTableDetails, teamManangementHeader } from '../../../datadump'
import { Link } from 'react-router-dom';

const AdminTeamManagement = () => {
  return (
		<div>
			<div className="w-full flex items-center justify-between ">
				<h2 className="mt-10 text-[32px] text-left font-bold text-gray-900 mb-2 pl-3">Team Managment</h2>
				<Link to= '/admin/addTeam'>
                <ButtonComponent
					title="Add Teams"
					className="bg-[#EBEDF2] text-black px-2 py-2 rounded-md hover:bg-[#EBEDF2] transition-all w-[150px] h-[48px]"
				/>
                </Link>
			</div>
			<div>
				<h3 className="pl-3 text-[18px] text-left font-bold text-gray-900">Team A</h3>
				<TaskTable tasks={teamManagmentTableDetails} tasksHeader={teamManangementHeader} />
			</div>
		</div>
	);
}

export default AdminTeamManagement
