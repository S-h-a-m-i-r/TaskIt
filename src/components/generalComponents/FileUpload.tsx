import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';
import { validateFiles, formatFileSize, MAX_FILE_SIZE, MAX_FILES_COUNT } from '../../utils/fileUtils';

interface FileUploadProps {
	files: File[];
	onFilesChange: (files: File[]) => void;
	maxSize?: number; // in bytes
	maxFiles?: number;
	acceptedTypes?: string[];
	className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
	files,
	onFilesChange,
	maxSize = MAX_FILE_SIZE,
	maxFiles = MAX_FILES_COUNT,
	acceptedTypes = ['*/*'],
	className = '',
}) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const [error, setError] = useState<string>('');

	const addFiles = useCallback((newFiles: FileList | File[]) => {
		const fileArray = Array.from(newFiles);
		setError('');

		// Validate files using utility function
		const validation = validateFiles(fileArray, maxSize, maxFiles);
		if (!validation.isValid) {
			setError(validation.error || 'Invalid files');
			return;
		}

		// Check if adding these files would exceed total size limit
		const totalSize = files.reduce((sum, file) => sum + file.size, 0) + 
			fileArray.reduce((sum, file) => sum + file.size, 0);
		
		if (totalSize > maxSize) {
			setError(`Total file size cannot exceed ${(maxSize / (1024 * 1024)).toFixed(1)}MB`);
			return;
		}

		onFilesChange([...files, ...fileArray]);
	}, [files, maxSize, maxFiles, onFilesChange]);

	const removeFile = (index: number) => {
		const newFiles = files.filter((_, i) => i !== index);
		onFilesChange(newFiles);
		setError('');
	};

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	}, []);

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		addFiles(e.dataTransfer.files);
	}, [addFiles]);

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			addFiles(e.target.files);
		}
	};

	const getFileIcon = (file: File) => {
		if (file.type.startsWith('image/')) {
			return <Image className="w-5 h-5 text-blue-500" />;
		}
		if (file.type.startsWith('text/')) {
			return <FileText className="w-5 h-5 text-green-500" />;
		}
		return <File className="w-5 h-5 text-gray-500" />;
	};

	return (
		<div className={`w-full ${className}`}>
			<div
				className={`bg-white border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
					isDragOver
						? 'border-blue-500 bg-blue-50'
						: 'border-gray-300 hover:border-gray-400'
				}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
				<div className="text-sm text-gray-600 mb-2">
					Drag and drop files here, or{' '}
					<label className="text-blue-600 hover:text-blue-500 cursor-pointer">
						browse
						<input
							type="file"
							multiple
							className="hidden"
							onChange={handleFileInput}
							accept={acceptedTypes.join(',')}
						/>
					</label>
				</div>
				<p className="text-xs text-gray-500">
					Maximum {maxFiles} files, total size up to {(maxSize / (1024 * 1024)).toFixed(1)}MB
				</p>
			</div>

			{error && (
				<div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
					{error}
				</div>
			)}

			{files.length > 0 && (
				<div className="mt-4 mb-4 max-h-[350px] overflow-y-auto">
				<h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				  {files.map((file, index) => (
					<div
					  key={index}
					  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
					>
					  <div className="flex items-center space-x-3">
						{getFileIcon(file)}
						<div>
						  <p className="text-sm font-medium text-gray-700">{file.name}</p>
						  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
						</div>
					  </div>
					  <button
						onClick={() => removeFile(index)}
						className="text-gray-400 hover:text-red-500 transition-colors"
					  >
						<X className="w-4 h-4" />
					  </button>
					</div>
				  ))}
				</div>
			  </div>
			  
			)}
		</div>
	);
};

export default FileUpload;
