import React, { useState, useEffect } from 'react';

interface LoadingDotsProps {
	text?: string;
	className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ 
	text = 'Loading', 
	className = '' 
}) => {
	const [dots, setDots] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev === 3 ? 1 : prev + 1));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={`flex items-center gap-2 text-lg font-medium text-gray-700 ${className}`}>
			<span className="min-w-[80px]">{text}{".".repeat(dots)}</span>
		</div>
	);
};

export default LoadingDots;
