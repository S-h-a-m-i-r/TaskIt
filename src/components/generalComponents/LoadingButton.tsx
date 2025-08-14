import React from 'react';

interface LoadingButtonProps {
	children: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	loadingText?: string;
	icon?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
	children,
	loading = false,
	disabled = false,
	onClick,
	type = 'button',
	className = '',
	loadingText,
	icon,
}) => {
	const isDisabled = disabled || loading;
	
	return (
		<button
			type={type}
			disabled={isDisabled}
			onClick={onClick}
			className={`
				inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200
				${isDisabled 
					? 'opacity-70 cursor-not-allowed' 
					: 'hover:opacity-90 active:scale-95'
				}
				${className}
			`}
		>
			{loading ? (
				<>
					{/* Loading Spinner */}
					<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
					{loadingText || children}
				</>
			) : (
				<>
					{icon && icon}
					{children}
				</>
			)}
		</button>
	);
};

export default LoadingButton;
