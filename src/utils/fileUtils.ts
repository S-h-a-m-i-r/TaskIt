export const MAX_FILE_SIZE = 60 * 1024 * 1024; // 60MB
export const MAX_FILES_COUNT = 10;

export interface FileValidationResult {
	isValid: boolean;
	error?: string;
}

export const validateFile = (
	file: File,
	maxSize: number = MAX_FILE_SIZE,
	acceptedTypes: string[] = ['*/*']
): FileValidationResult => {
	// Check file size
	if (file.size > maxSize) {
		return {
			isValid: false,
			error: `File ${file.name} is too large. Maximum size is ${(maxSize / (1024 * 1024)).toFixed(1)}MB`,
		};
	}

	// Check file type if specific types are specified
	if (acceptedTypes.length > 0 && !acceptedTypes.includes('*/*')) {
		const isValidType = acceptedTypes.some(type => {
			if (type.endsWith('/*')) {
				return file.type.startsWith(type.replace('/*', ''));
			}
			return file.type === type;
		});
		if (!isValidType) {
			return {
				isValid: false,
				error: `File ${file.name} has an unsupported type. Allowed types: ${acceptedTypes.join(', ')}`,
			};
		}
	}

	return { isValid: true };
};

export const validateFiles = (
	files: File[],
	maxTotalSize: number = MAX_FILE_SIZE,
	maxCount: number = MAX_FILES_COUNT
): FileValidationResult => {
	// Check total number of files
	if (files.length > maxCount) {
		return {
			isValid: false,
			error: `Maximum ${maxCount} files allowed`,
		};
	}

	// Check total size
	const totalSize = files.reduce((sum, file) => sum + file.size, 0);
	if (totalSize > maxTotalSize) {
		return {
			isValid: false,
			error: `Total file size cannot exceed ${(maxTotalSize / (1024 * 1024)).toFixed(1)}MB`,
		};
	}

	// Validate each file
	for (const file of files) {
		const validation = validateFile(file, maxTotalSize);
		if (!validation.isValid) {
			return validation;
		}
	}

	return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (fileType: string): string => {
	if (fileType.startsWith('image/')) {
		return 'image';
	}
	if (fileType.startsWith('text/')) {
		return 'file-text';
	}
	if (fileType.startsWith('video/')) {
		return 'video';
	}
	if (fileType.startsWith('audio/')) {
		return 'music';
	}
	if (fileType.includes('pdf')) {
		return 'file-text';
	}
	if (fileType.includes('word') || fileType.includes('document')) {
		return 'file-text';
	}
	if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
		return 'file-text';
	}
	return 'file';
};
