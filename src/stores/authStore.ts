import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  loginUser,
  registerUser,
  completeRegistration,
  loginWithGoogle,
} from "../services/authService";
import {
	User,
	LoginCredentials,
	RegisterCredentials,
	CompleteRegistrationData,
	AuthResponse,
} from '../types/auth';

interface AuthState {
  user: User | null;
  token?: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  loginWithGoogle: (token: string) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  completeRegistration: (
    registrationData: CompleteRegistrationData
  ) => Promise<AuthResponse>;
}

const useAuthStore = create(
  devtools(
    persist(
      (set): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,

        setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
        setToken: (token: string | null) => set({ token }),

        logout: () => {
          // Clear store state
          set({ user: null, token: null, isAuthenticated: false });
        },

        login: async (credentials: LoginCredentials) => {
          set({ loading: true });
          try {
            const res = await loginUser(credentials);
            const { token, user } = res;
            set({ token, user, isAuthenticated: true });
            return res;
          } finally {
            set({ loading: false });
          }
        },

        loginWithGoogle: async (token: string) => {
          set({ loading: true });
          try {
            const res = await loginWithGoogle(token);
            const { token: authToken, user } = res;
            set({ token: authToken, user, isAuthenticated: true });
            return res;
          } finally {
            set({ loading: false });
          }
        },

        register: async (credentials: RegisterCredentials) => {
          set({ loading: true });
          try {
            const res = await registerUser(credentials);
            // Add user/token if your register endpoint returns them
            set({ isAuthenticated: true });
            return res;
          } finally {
            set({ loading: false });
          }
        },

        completeRegistration: async (
          registrationData: CompleteRegistrationData
        ) => {
          set({ loading: true });
          try {
            const res = await completeRegistration(registrationData);
            if (res.success && res.token && res.user) {
              set({ token: res.token, user: res.user, isAuthenticated: true });
            }

            return res;
          } finally {
            set({ loading: false });
          }
        },
      }),
      {
        name: "auth-storage", // key in localStorage
        partialize: (state: AuthState) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "AuthStore" }
  )
);

export default useAuthStore;
