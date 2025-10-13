import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  loginUser,
  registerUser,
  completeRegistration,
  loginWithGoogle,
  uploadProfilePictureToS3,
  updateUserProfileService,
} from "../services/authService";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  CompleteRegistrationData,
  AuthResponse,
} from "../types/auth";

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
  updateProfilePicture: (file: File) => Promise<string>;
  updateUserProfile: (userData: {
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    bio?: string;
  }) => Promise<void>;
}

const useAuthStore = create(
  devtools(
    persist(
      (set, get): AuthState => ({
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
            console.log("🔍 Auth Store Debug - Starting Google login with token length:", token.length);
            
            const res = await loginWithGoogle(token);
            console.log("🔍 Auth Store Debug - Service response received:", res);
            
            if (!res) {
              throw new Error("No response received from authentication service");
            }
            
            if (!res.token || !res.user) {
              console.error("❌ Auth Store Error - Invalid response structure:", res);
              throw new Error("Invalid response structure from authentication service");
            }
            
            const { token: authToken, user } = res;
            console.log("🔍 Auth Store Debug - Setting user data:", {
              userId: user._id,
              email: user.email,
              role: user.role
            });
            
            set({ token: authToken, user, isAuthenticated: true });
            console.log("✅ Auth Store Debug - Google login completed successfully");
            return res;
          } catch (error) {
            console.error("❌ Auth Store Error - Google login failed:", error);
            set({ loading: false });
            throw error; // Re-throw to be handled by the calling component
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

        updateProfilePicture: async (file: File) => {
          set({ loading: true });
          try {
            const s3Key = await uploadProfilePictureToS3(file);
            console.log("Profile picture S3 key received:", s3Key);

            // Update user in store with the S3 key
            set((state) => ({
              user: state.user
                ? { ...state.user, profilePicture: s3Key }
                : null,
            }));

            return s3Key;
          } catch (error) {
            console.error("Profile picture update error:", error);
            throw error;
          } finally {
            set({ loading: false });
          }
        },

        updateUserProfile: async (userData) => {
          set({ loading: true });
          try {
            const currentUser = get().user;
            if (!currentUser) {
              throw new Error("User not found");
            }

            const response = await updateUserProfileService(
              currentUser._id,
              userData
            );
            console.log("Profile update response:", response);

            if (!response.success) {
              throw new Error(response.message || "Failed to update profile");
            }

            // Update user in store with new data
            set((state) => ({
              user: state.user ? { ...state.user, ...response.data } : null,
            }));

            console.log("Profile updated successfully:", response.data);
          } catch (error) {
            console.error("Profile update error:", error);
            throw error;
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
