import { useState, useCallback } from 'react';
import { message } from 'antd';
import { 
	getUploadUrlService, 
	attachFilesToTaskService, 
	removeFileFromTaskService,
	uploadFileToS3,
	FileInfo 
} from '../services/fileService';
import { validateFiles, MAX_FILE_SIZE, MAX_FILES_COUNT } from '../utils/fileUtils';

interface UseFileUploadReturn {
	uploadFiles: (files: File[]) => Promise<FileInfo[]>;
	attachFilesToTask: (taskId: string, files: FileInfo[]) => Promise<boolean>;
	removeFile: (taskId: string, fileKey: string) => Promise<boolean>;
	uploading: boolean;
	progress: number;
	error: string | null;
	clearError: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const uploadFiles = useCallback(async (files: File[]): Promise<FileInfo[]> => {
		// Validate files first
		const validation = validateFiles(files, MAX_FILE_SIZE, MAX_FILES_COUNT);
		if (!validation.isValid) {
			throw new Error(validation.error || 'Invalid files');
		}

		setUploading(true);
		setProgress(0);
		setError(null);

		try {
			const uploadedFiles: FileInfo[] = [];
			const totalFiles = files.length;

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				
				try {
					// Update progress
					setProgress(((i + 1) / totalFiles) * 100);

					// Get presigned URL
					const uploadUrlRes = await getUploadUrlService(
						file.name,
						file.type,
						file.size
					);
					if (uploadUrlRes.success) {
						// Upload to S3
						await uploadFileToS3(file, uploadUrlRes.uploadUrl);
						
						// Add to uploaded files list
						uploadedFiles.push({
							fileName: file.name,
							fileSize: file.size,
							fileType: file.type,
							fileKey: uploadUrlRes.fileKey,
						});

						message.success(`Uploaded ${file.name}`);
					} else {
						throw new Error(`Failed to get upload URL for ${file.name}`);
					}
				} catch (fileError) {
message.error(
							fileError instanceof Error
								? fileError.message
								: `Failed to upload file ${file.name}. Please try again.`
						);
						// Continue with next file instead of failing all
						continue;
				}
			}

			setProgress(100);
			message.success(`Successfully uploaded ${uploadedFiles.length} files`);
			return uploadedFiles;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Upload failed';
			setError(errorMessage);
			message.error(errorMessage);
			throw error;
		} finally {
			setUploading(false);
		}
	}, []);

	const attachFilesToTask = useCallback(async (
		taskId: string, 
		files: FileInfo[]
	): Promise<boolean> => {
		try {
			const res = await attachFilesToTaskService(taskId, files);
			if (res.success) {
				message.success('Files attached to task successfully');
				return true;
			} else {
				throw new Error(res.message || 'Failed to attach files to task');
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to attach files';
			setError(errorMessage);
			message.error(errorMessage);
			return false;
		}
	}, []);

	const removeFile = useCallback(async (
		taskId: string, 
		fileKey: string
	): Promise<boolean> => {
		try {
			const res = await removeFileFromTaskService(taskId, fileKey);
			if (res.success) {
				message.success('File removed successfully');
				return true;
			} else {
				throw new Error(res.message || 'Failed to remove file');
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to remove file';
			setError(errorMessage);
			message.error(errorMessage);
			return false;
		}
	}, []);

	return {
		uploadFiles,
		attachFilesToTask,
		removeFile,
		uploading,
		progress,
		error,
		clearError,
	};
};
