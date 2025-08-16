import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getAllUsers, getUsersByRole, addTeamMember, getAllTeamMembers, getTeamMember, updateTeamMember, deleteTeamMember } from '../services/authService';

// Define types for the store
interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	userName: string;
}

interface TeamMember {
	_id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phone: string;
	role: string;
	isVerified: boolean;
	__v: number;
}

interface UserState {
	users: User[];
	teamMembers: TeamMember[];
	selectedTeamMember: TeamMember | null;
	loading: boolean;
	getAllUsers: () => Promise<{
		success: boolean;
		users: User[];
		message?: string;
	}>;
	getUsersByRole: (roles: string[]) => Promise<{
		success: boolean;
		users: User[];
		message?: string;
	}>;
	addTeamMember: (teamMemberData: {
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		phone: string;
		password: string;
		role: string;
		isVerified: boolean;
	}) => Promise<{
		success: boolean;
		message?: string;
	}>;
	getAllTeamMembers: () => Promise<{
		success: boolean;
		teamMembers: TeamMember[];
		message?: string;
	}>;
	getTeamMember: (id: string) => Promise<{
		success: boolean;
		teamMember: TeamMember;
		message?: string;
	}>;
	updateTeamMember: (id: string, teamMemberData: {
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		phone: string;
		password?: string;
		role: string;
		isVerified: boolean;
	}) => Promise<{
		success: boolean;
		message?: string;
	}>;
	deleteTeamMember: (id: string) => Promise<{
		success: boolean;
		message?: string;
	}>;
}

const useUserStore = create(
	devtools(
		persist(
			(set): UserState => ({
				users: [],
				teamMembers: [],
				selectedTeamMember: null,
				loading: false,

				getAllUsers: async () => {
					set({ loading: true });
					try {
						const res = await getAllUsers();
						const { users } = res;
						set({ users });
						return res;
					} catch (error) {
						console.error('Failed to fetch all users:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				getUsersByRole: async (roles: string[]) => {
					set({ loading: true });
					try {
						const res = await getUsersByRole(roles);
						const { users } = res;
						set({ users: users || [] });
						return res;
					} catch (error) {
						console.error('Failed to fetch users by role:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				addTeamMember: async (teamMemberData) => {
					set({ loading: true });
					try {
						const res = await addTeamMember(teamMemberData);
						return res;
					} catch (error) {
						console.error('Failed to add team member:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				getAllTeamMembers: async () => {
					set({ loading: true });
					try {
						const res = await getAllTeamMembers();
						const { teamMembers } = res;
						set({ teamMembers });
						return res;
					} catch (error) {
						console.error('Failed to fetch team members:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				getTeamMember: async (id: string) => {
					set({ loading: true });
					try {
						const res = await getTeamMember(id);
						const { teamMember } = res;
						set({ selectedTeamMember: teamMember });
						return res;
					} catch (error) {
						console.error('Failed to fetch team member:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				updateTeamMember: async (id: string, teamMemberData) => {
					set({ loading: true });
					try {
						const res = await updateTeamMember(id, teamMemberData);
						return res;
					} catch (error) {
						console.error('Failed to update team member:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
				deleteTeamMember: async (id: string) => {
					set({ loading: true });
					try {
						const res = await deleteTeamMember(id);
						return res;
					} catch (error) {
						console.error('Failed to delete team member:', error);
						throw error;
					} finally {
						set({ loading: false });
					}
				},
			}),

			{
				name: 'user-storage',
				partialize: (state: UserState) => ({
					users: state.users,
					teamMembers: state.teamMembers,
					selectedTeamMember: state.selectedTeamMember,
				}),
			}
		),
		{ name: 'UserStore' }
	)
);

export default useUserStore; 