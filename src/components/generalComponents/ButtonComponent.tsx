interface ButtonProps {
	icon?: string;
	title: string;
	className?: string
	onClick?: () => void;
}

const ButtonComponent = (props: ButtonProps) => {
	const {className, onClick} = props

	return (
		<button
			type="button"
			className={className}
			onClick={onClick}
		>	
		{props.icon && 
			<img src={props.icon} alt={props.title} className="w-5 h-5" />
		}
			{props.title}
		</button>
	);
};

export default ButtonComponent;
