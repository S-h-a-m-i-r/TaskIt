import React from 'react';

interface CardSkeletonProps {
	count?: number;
	className?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ 
	count = 1, 
	className = '' 
}) => {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={`flex-1 bg-gray-50 rounded-md p-4 shadow-md ${className}`}
				>
					<div className="w-full flex justify-between items-start">
						<div className="text-left flex flex-col gap-3">
							{/* Title skeleton */}
							<div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
							{/* Count skeleton */}
							<div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
						</div>
						{/* Icon skeleton */}
						<div className="bg-gray-200 p-3 rounded-full w-12 h-12 animate-pulse"></div>
					</div>
					{/* Bottom section skeleton */}
					<div className="flex items-center gap-2 mt-7">
						<div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
						<div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
						<div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
					</div>
				</div>
			))}
		</>
	);
};

export default CardSkeleton; 