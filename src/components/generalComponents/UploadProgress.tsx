import React from 'react';

interface UploadProgressProps {
	progress: number;
	className?: string;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress, className = '' }) => {
	if (progress === 0 || progress === 100) {
		return null;
	}

	return (
		<div className={`w-full ${className}`}>
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium text-gray-700">Uploading files...</span>
				<span className="text-sm text-gray-500">{Math.round(progress)}%</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2">
				<div
					className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

export default UploadProgress;
