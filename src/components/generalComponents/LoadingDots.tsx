import React from 'react';
import { Triangle } from 'react-loader-spinner';

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
			<Triangle
				height="60"
				width="60"
				color="#0C1421"
				ariaLabel="triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};

export default LoadingDots;
