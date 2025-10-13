import { request } from './request';

export interface FileUploadResponse {
	success: boolean;
	uploadUrl: string;
	fileKey: string;
	message?: string;
}

export interface AttachFilesResponse {
	success: boolean;
	message?: string;
}

export interface FileInfo {
	fileName: string;
	fileSize: number;
	fileType: string;
	fileKey: string;
}

// Get presigned URL for file upload
export const getUploadUrlService = (
	fileName: string,
	fileType: string,
	fileSize: number
): Promise<FileUploadResponse> => {
	return request<FileUploadResponse>({
		method: 'post',
		url: '/files/upload-url',
		data: {
			fileName,
			fileType,
			fileSize,
		},
	});
};

// Attach files to a task
export const attachFilesToTaskService = (
	taskId: string,
	files: FileInfo[]
): Promise<AttachFilesResponse> => {
	return request<AttachFilesResponse>({
		method: 'post',
		url: `/files/${taskId}/files`,
		data: { files },
	});
};

// Upload file to S3 using presigned URL
export const uploadFileToS3 = async (
	file: File,
	uploadUrl: string
): Promise<void> => {
	try {
		const response = await fetch(uploadUrl, {
			method: 'PUT',
			body: file,
			headers: {
				'Content-Type': file.type,
				// Remove any headers that might cause CORS issues
			},
			mode: 'cors', // Explicitly set CORS mode
		});

		if (!response.ok) {
			throw new Error(`S3 upload failed: ${response.status} ${response.statusText}`);
		}

		// Check if the upload was successful
		if (response.status !== 200 && response.status !== 201) {
			throw new Error(`S3 upload failed with status: ${response.status}`);
		}
	} catch (error) {
		console.error('S3 upload error details:', error);
		if (error instanceof TypeError && error.message.includes('CORS')) {
			throw new Error('CORS error: Please check S3 bucket CORS configuration');
		}
		throw new Error(`Failed to upload file to S3: ${error}`);
	}
};

// Download file from S3
export const downloadFileService = async (
	fileKey: string,
	fileName: string
): Promise<void> => {
	try {
		// Get presigned download URL from backend
		const response = await request<{ success: boolean; downloadUrl: string; message?: string }>({
			method: 'get',
			url: `/files/download/${fileKey}`,
		});

		if (response.success && response.downloadUrl) {
			// Force download by fetching the file content first
			try {
				const fileResponse = await fetch(response.downloadUrl);
				if (!fileResponse.ok) {
					throw new Error(`Failed to fetch file: ${fileResponse.status}`);
				}
				
				const blob = await fileResponse.blob();
				const url = window.URL.createObjectURL(blob);
				
				// Create download link with local blob URL
				const link = document.createElement('a');
				link.href = url;
				link.download = fileName;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				
				// Clean up the blob URL
				setTimeout(() => window.URL.revokeObjectURL(url), 100);
			} catch (fetchError) {
				console.error('Fetch error:', fetchError);
				// Fallback: try direct download (may open in new tab)
				const link = document.createElement('a');
				link.href = response.downloadUrl;
				link.target = '_blank';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		} else {
			throw new Error(response.message || 'Failed to get download URL');
		}
	} catch (error) {
		throw new Error(`Failed to download file: ${error}`);
	}
};

// Remove file from task
export const removeFileFromTaskService = (
	taskId: string,
	fileKey: string
): Promise<AttachFilesResponse> => {
	return request<AttachFilesResponse>({
		method: 'delete',
		url: `/files/${taskId}/files/${fileKey}`,
	});
};

// Get file download URL by fileKey (for presigned URL generation)
export const getFileDownloadUrlByKey = async (
	fileKey: string
): Promise<{ success: boolean; downloadUrl: string; message?: string }> => {
	try {
		const response = await request<{ success: boolean; downloadUrl: string; message?: string }>({
			method: 'get',
			url: `/files/download/${fileKey}`,
		});

		return response;
	} catch (error) {
		throw new Error(`Failed to get download URL: ${error}`);
	}
};
