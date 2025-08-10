import React, { useState } from 'react';
import { Download, FileText, Image, File, X, Upload, Plus } from 'lucide-react';
import { TaskFile } from '../../types/task';
import { downloadFileService } from '../../services/fileService';
import { message } from 'antd';
import { useFileUpload } from '../../hooks/useFileUpload';
import { MAX_FILE_SIZE, MAX_FILES_COUNT } from '../../utils/fileUtils';

interface TaskFilesProps {
	files: TaskFile[];
	onRemoveFile?: (fileKey: string) => void;
	onFilesAdded?: (newFiles: TaskFile[]) => void;
	readonly?: boolean;
	className?: string;
	taskId?: string;
}

const TaskFiles: React.FC<TaskFilesProps> = ({
	files,
	onRemoveFile,
	onFilesAdded,
	readonly = true,
	className = '',
	taskId,
}) => {
	const { uploadFiles, attachFilesToTask, removeFile, uploading, error, clearError } = useFileUpload();
	const [showUpload, setShowUpload] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	if (!files || files.length === 0) {
		return null;
	}

	const getFileIcon = (file: TaskFile) => {
		if (file?.fileType?.startsWith('image/')) {
			return <Image className="w-5 h-5 text-blue-500" />;
		}
		if (file?.fileType?.startsWith('text/')) {
			return <FileText className="w-5 h-5 text-green-500" />;
		}
		return <File className="w-5 h-5 text-gray-500" />;
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const handleDownload = async (file: TaskFile) => {
		try {
			const fileName = file.fileKey.split('/').pop() || file.fileKey;
			 await downloadFileService(fileName, file.filename);
			message.success(`Downloading ${file.filename}`);
		} catch (error) {
			console.error('Failed to download file:', error);
			message.error(`Failed to download ${file.filename}`);
		}
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files;
		if (fileList) {
			const fileArray = Array.from(fileList);
			setSelectedFiles(fileArray);
			clearError();
		}
	};

	const handleUploadFiles = async () => {
		if (!taskId || selectedFiles.length === 0) return;

		try {
			// Upload files to S3
			const uploadedFiles = await uploadFiles(selectedFiles);
			// Convert FileInfo to TaskFile format
			const taskFiles: TaskFile[] = uploadedFiles.map(file => ({
				filename: file.fileName, // Map fileName to filename
				fileSize: file.fileSize,
				fileType: file.fileType,
				fileKey: file.fileKey,
				uploadedAt: new Date().toISOString()
			}));
			
			// Attach files to the task
			const attached = await attachFilesToTask(taskId, uploadedFiles);
			
			if (attached && onFilesAdded) {
				onFilesAdded(taskFiles);
				message.success('Files attached successfully!');
				setSelectedFiles([]);
				setShowUpload(false);
			}
		} catch (error) {
			console.error('Failed to upload files:', error);
		}
	};

	const handleRemoveFile = async (fileKey: string) => {
		if (!taskId) return;
		
		try {
			const actualFileKey = fileKey.split('/').pop() || fileKey;
			const success = await removeFile(taskId, actualFileKey);
			if (success && onRemoveFile) {
				// Only call the callback to update UI state, don't make another backend request
				onRemoveFile(fileKey);
			}
		} catch (error) {
			console.error('Failed to remove file:', error);
		}
	};

	const removeSelectedFile = (index: number) => {
		setSelectedFiles(prev => prev.filter((_, i) => i !== index));
	};
	return (
		<div className={`space-y-3 ${className}`}>
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
					Attached Files ({files.length})
				</h4>
				{!readonly && taskId && (
					<button
						onClick={() => setShowUpload(!showUpload)}
						className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
					>
						<Plus className="w-4 h-4" />
						Add Files
					</button>
				)}
			</div>

			{/* File Upload Section for Existing Tasks */}
			{!readonly && taskId && showUpload && (
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
					<div className="text-center">
						<Upload className="mx-auto h-12 w-12 text-gray-400" />
						<div className="mt-2">
							<label htmlFor="file-upload" className="cursor-pointer">
								<span className="text-sm text-blue-600 hover:text-blue-500">
									Click to select files
								</span>
								<input
									id="file-upload"
									name="file-upload"
									type="file"
									multiple
									className="sr-only"
									onChange={handleFileSelect}
									accept="*/*"
								/>
							</label>
							<p className="text-xs text-gray-500 mt-1">
								Max {MAX_FILES_COUNT} files, {MAX_FILE_SIZE / (1024 * 1024)}MB total
							</p>
						</div>
					</div>

					{/* Selected Files Preview */}
					{selectedFiles.length > 0 && (
						<div className="mt-4 space-y-2">
							<h5 className="text-sm font-medium text-gray-700">Selected Files:</h5>
							{selectedFiles.map((file, index) => (
								<div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
									<div className="flex items-center space-x-2">
										<File className="w-4 h-4 text-gray-500" />
										<span className="text-sm text-gray-700">{file.name}</span>
										<span className="text-xs text-gray-500">
											({(file.size / (1024 * 1024)).toFixed(2)} MB)
										</span>
									</div>
									<button
										onClick={() => removeSelectedFile(index)}
										className="text-red-500 hover:text-red-700"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							))}
							<div className="flex gap-2 mt-3">
								<button
									onClick={handleUploadFiles}
									disabled={uploading}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 text-sm"
								>
									{uploading ? 'Uploading...' : 'Upload Files'}
								</button>
								<button
									onClick={() => {
										setShowUpload(false);
										setSelectedFiles([]);
									}}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					)}

					{error && (
						<div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
							{error}
						</div>
					)}
				</div>
			)}

			{/* Existing Files Display */}
			{files && files.length > 0 && (
				<div className="space-y-2">
					{files.map((file, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-300 hover:cursor-pointer transition-colors"
						>
							<div className="flex items-center space-x-3 flex-1 min-w-0">
								{getFileIcon(file)}
								<div className="min-w-0 flex-1">
									<p className="text-sm font-medium text-gray-700 truncate">
										{file.filename}
									</p>
									<div className="flex items-center gap-4 text-xs text-gray-500">
										<span>{formatFileSize(file.fileSize)}</span>
										<span>{formatDate(file.uploadedAt)}</span>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => handleDownload(file)}
									className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
									title="Download file"
								>
									<Download className="w-4 h-4" />
								</button>
								{!readonly && onRemoveFile && (
									<button
										onClick={() => handleRemoveFile(file.fileKey)}
										className="p-1 text-gray-400 hover:text-red-500 transition-colors"
										title="Remove file"
									>
										<X className="w-4 h-4" />
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			{/* No Files Message */}
			{(!files || files.length === 0) && !showUpload && (
				<div className="text-gray-500 text-sm text-center py-4">
					No attachments for this task
				</div>
			)}
		</div>
	);
};

export default TaskFiles;
