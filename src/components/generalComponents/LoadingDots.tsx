import React from 'react';
import { Watch } from 'react-loader-spinner';

interface LoadingDotsProps {
	text?: string;
	className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ 
	className = '' 
}) => {
	

	return (
		<div className={`flex items-center gap-2 text-lg font-medium text-gray-700 ${className}`}>
			{/* Loading spinner */}
			<Watch
				height="60"
				width="60"
				color="#0C1421"
				ariaLabel="clock-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default LoadingDots;
