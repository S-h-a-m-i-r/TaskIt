import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getAllUsers, getUsersByRole } from '../services/authService';

// Define types for the store
interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	userName: string;
}

interface UserState {
	users: User[];
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
}

const useUserStore = create(
	devtools(
		persist(
			(set): UserState => ({
				users: [],
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
			}),

			{
				name: 'user-storage',
				partialize: (state: UserState) => ({
					users: state.users,
				}),
			}
		),
		{ name: 'UserStore' }
	)
);

export default useUserStore; 