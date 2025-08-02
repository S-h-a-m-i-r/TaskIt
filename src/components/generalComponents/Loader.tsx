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
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12',
		xl: 'w-16 h-16'
	};

	return (
		<div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
			{/* Spinning loader */}
			<div className="relative">
				<div 
					className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}
					style={{
						borderTopColor: '#5051F9' // Your primary color
					}}
				></div>
			</div>
			
			{/* Loading text */}
			{text && (
				<div className="text-center">
					<p className="text-gray-600 font-medium text-sm">{text}</p>
				</div>
			)}
		</div>
	);
};

export default Loader; 