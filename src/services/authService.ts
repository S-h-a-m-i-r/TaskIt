import { request } from './request';
import {
	LoginCredentials,
	RegisterCredentials,
	CompleteRegistrationData,
	AuthResponse,
	GetUsersResponse,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	ForgotPasswordResponse,
	ResetPasswordResponse,
} from '../types/auth';

export const loginUser = (
	credentials: LoginCredentials
): Promise<AuthResponse> => {
	return request<AuthResponse>({
		method: 'post',
		url: '/auth/login',
		data: credentials as unknown as Record<string, unknown>,
	});
};

export const registerUser = (
	credentials: RegisterCredentials
): Promise<AuthResponse> => {
	return request<AuthResponse>({
		method: 'post',
		url: '/auth/register',
		data: credentials as unknown as Record<string, unknown>,
	});
};

export const completeRegistration = (
	registrationData: CompleteRegistrationData
): Promise<AuthResponse> => {
	// Transform the data to match your backend API structure
	const transformedData = {
		firstName: registrationData.userDetails.firstName,
		lastName: registrationData.userDetails.lastName,
		email: registrationData.userDetails.email,
		phone: registrationData.userDetails.phone,
		userName: registrationData.userDetails.userName,
		password: registrationData.password,
		planType: registrationData.planDetails.planType,
		planName: registrationData.planDetails.planName,
		planPrice: registrationData.planDetails.price,
		planCredits: registrationData.planDetails.credits,
		paymentMethod: {
			paymentMethodId: registrationData.paymentMethod.paymentMethodId,
			customerId: registrationData.paymentMethod.customerId,
			cardLast4: registrationData.paymentMethod.cardLast4,
			cardBrand: registrationData.paymentMethod.cardBrand,
			cardExpMonth: registrationData.paymentMethod.cardExpMonth,
			cardExpYear: registrationData.paymentMethod.cardExpYear,
			cardFunding: registrationData.paymentMethod.cardFunding,
			token: registrationData.paymentMethod.token,
		},
	};

	return request<AuthResponse>({
		method: 'post',
		url: '/auth/register',
		data: transformedData as unknown as Record<string, unknown>,
	});
};

export const getAllUsers = (): Promise<GetUsersResponse> => {
	return request<GetUsersResponse>({
		method: 'get',
		url: '/users',
	});
};

export const getUsersByRole = (roles: string[]): Promise<GetUsersResponse> => {
	return request<GetUsersResponse>({
		method: 'get',
		url: `/users/by-role?role=${roles.join(',')}`,
	});
};

export const forgotPassword = (
	email: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
	return request<ForgotPasswordResponse>({
		method: 'post',
		url: '/auth/forget-password',
		data: email as unknown as Record<string, unknown>,
	});
};

export const resetPassword = (
	passwordData: ResetPasswordRequest,
	token: string
): Promise<ResetPasswordResponse> => {
	// Transform the data to match backend expectations
	const transformedData = {
		password: passwordData.password,
		confirmPassword: passwordData.confirmPassword,
	};

	return request<ResetPasswordResponse>({
		method: 'post',
		url: `/auth/reset-password?token=${token}`,
		data: transformedData as unknown as Record<string, unknown>,
	});
};

export const addTeamMember = (teamMemberData: {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phone: string;
	password: string;
	role: string;
	isVerified: boolean;
}): Promise<{ success: boolean; message?: string }> => {
	return request<{ success: boolean; message?: string }>({
		method: 'post',
		url: '/team/addMember',
		data: teamMemberData as unknown as Record<string, unknown>,
	});
};

export const getAllTeamMembers = (): Promise<{
	success: boolean;
	teamMembers: Array<{
		_id: string;
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		phone: string;
		role: string;
		isVerified: boolean;
		__v: number;
	}>;
	message?: string;
}> => {
	return request<{
		success: boolean;
		teamMembers: Array<{
			_id: string;
			firstName: string;
			lastName: string;
			userName: string;
			email: string;
			phone: string;
			role: string;
			isVerified: boolean;
			__v: number;
		}>;
		message?: string;
	}>({
		method: 'get',
		url: '/team/allMembers',
	});
};

export const getTeamMember = (id: string): Promise<{
	success: boolean;
	teamMember: {
		_id: string;
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
		phone: string;
		role: string;
		isVerified: boolean;
		__v: number;
	};
	message?: string;
}> => {
	return request<{
		success: boolean;
		teamMember: {
			_id: string;
			firstName: string;
			lastName: string;
			userName: string;
			email: string;
			phone: string;
			role: string;
			isVerified: boolean;
			__v: number;
		};
		message?: string;
	}>({
		method: 'get',
		url: `/team/getMember/${id}`,
	});
};

export const updateTeamMember = (id: string, teamMemberData: {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phone: string;
	password?: string;
	role: string;
	isVerified: boolean;
}): Promise<{ success: boolean; message?: string }> => {
	return request<{ success: boolean; message?: string }>({
		method: 'put',
		url: `/team/updateMember/${id}`,
		data: teamMemberData as unknown as Record<string, unknown>,
	});
};

export const deleteTeamMember = (id: string): Promise<{ success: boolean; message?: string }> => {
	return request<{ success: boolean; message?: string }>({
		method: 'delete',
		url: `/team/deleteMember/${id}`,
	});
};

export const loginWithGoogle = (token: string): Promise<AuthResponse> => {
  console.log("🔍 Auth Service Debug - Making Google auth request to /auth/google");
  console.log("🔍 Auth Service Debug - Token length:", token.length);
  
  return request<AuthResponse>({
    method: "post",
    url: "/auth/google",
    data: { token } as unknown as Record<string, unknown>,
  }).then((response) => {
    console.log("✅ Auth Service Debug - Google auth response received:", response);
    return response;
  }).catch((error) => {
    console.error("❌ Auth Service Error - Google auth request failed:", error);
    throw error;
  });
};

// Profile picture upload functions
export const getProfilePictureUploadUrl = (data: {
  filename: string;
  contentType: string;
  fileSize: number;
}): Promise<{
  success: boolean;
  uploadUrl: string;
  fileKey: string;
  message: string;
}> => {
  return request({
    method: 'post',
    url: '/users/profile-picture/upload-url',
    data: data as unknown as Record<string, unknown>,
  });
};

export const updateProfilePicture = (s3Key: string): Promise<{
  success: boolean;
  message: string;
  data: {
    profilePicture: string;
  };
}> => {
  return request({
    method: 'put',
    url: '/users/profile-picture',
    data: { s3Key } as unknown as Record<string, unknown>,
  });
};

// Get profile picture download URL
export const getProfilePictureDownloadUrl = async (): Promise<{ success: boolean; data?: any; message?: string }> => {
  const response = await request<{ success: boolean; data?: any; message?: string }>({
    method: 'get',
    url: '/users/profile-picture/download',
  });

  return response;
};

export const uploadProfilePictureToS3 = async (file: File): Promise<string> => {
  try {
    // Get presigned URL
    const uploadUrlResponse = await getProfilePictureUploadUrl({
      filename: file.name,
      contentType: file.type,
      fileSize: file.size,
    });

    if (!uploadUrlResponse.success) {
      throw new Error('Failed to get upload URL');
    }

    const { uploadUrl, fileKey } = uploadUrlResponse;

    // Upload file to S3
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file to S3');
    }

    // Update user profile picture in database
    const updateResponse = await updateProfilePicture(fileKey);
    
    if (!updateResponse.success) {
      throw new Error('Failed to update profile picture in database');
    }

    // Return the S3 key (not the full URL)
    return fileKey;
  } catch (error) {
    console.error('Profile picture upload error:', error);
    throw error;
  }
};

// Update user profile information
export const updateUserProfileService = async (userId: string, userData: {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  profilePicture?: string;
}): Promise<{ success: boolean; data?: any; message?: string }> => {
  try {
    const response = await request<{ success: boolean; data?: any; message?: string }>({
      method: 'put',
      url: `/users/${userId}`,
      data: userData,
    });

    return response;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};