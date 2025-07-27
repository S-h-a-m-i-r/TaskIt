import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginUser, registerUser } from "../services/authService";

const useAuthStore = create(
	devtools(
		persist(
			(set) => ({
				user: null,
				token: null,
				isAuthenticated: false,
				loading: false,

				setUser: (user: any) => set({ user, isAuthenticated: !!user }),
				setToken: (token: any) => set({ token }),

				logout: () => {
					set({ user: null, token: null, isAuthenticated: false });
				},

				login: async (credentials: any) => {
					set({ loading: true });
					try {
						const res = await loginUser(credentials);
						const { token, user } = res;
						set({ token, user, isAuthenticated: true });
						return res;
					} catch (error) {
						throw error;
					} finally {
						set({ loading: false });
					}
				},

				register: async (credentials: any) => {
					set({ loading: true });
					try {
						const res = await registerUser(credentials);
						// Add user/token if your register endpoint returns them
						set({ isAuthenticated: true });
						return res;
					} catch (error) {
						throw error;
					} finally {
						set({ loading: false });
					}
				},
			}),
			{
				name: "auth-storage", // key in localStorage
				partialize: (state) => ({
					user: state.user,
					token: state.token,
					isAuthenticated: state.isAuthenticated,
				}),
			}
		)
	)
);

export default useAuthStore;
