import React from 'react';

interface LoaderProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	text?: string;
	className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
	size = 'md', 
	text = 'Loading...', 
	className = '' 
}) => {
	const sizeClasses = {
		sm: 'w-2 h-2',
		md: 'w-3 h-3',
		lg: 'w-4 h-4',
		xl: 'w-5 h-5'
	};

	const textSizes = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base',
		xl: 'text-lg'
	};

	return (
		<div className={`flex items-center justify-center gap-2 ${className}`}>
			{/* Three dots animation */}
			<div className="flex gap-1">
				<div 
					className={`${sizeClasses[size]} bg-primary-50 rounded-full animate-bounce`}
					style={{ animationDelay: '0ms' }}
				></div>
				<div 
					className={`${sizeClasses[size]} bg-primary-50 rounded-full animate-bounce`}
					style={{ animationDelay: '150ms' }}
				></div>
				<div 
					className={`${sizeClasses[size]} bg-primary-50 rounded-full animate-bounce`}
					style={{ animationDelay: '300ms' }}
				></div>
			</div>
			
			{/* Loading text */}
			{text && (
				<span className={`text-gray-600 font-medium ${textSizes[size]}`}>
					{text}
				</span>
			)}
		</div>
	);
};

export default Loader; 