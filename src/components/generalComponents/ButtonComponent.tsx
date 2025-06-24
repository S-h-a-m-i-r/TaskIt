interface ButtonProps {
	icon?: string;
	title: string;
	className?: string
}

const ButtonComponent = (props: ButtonProps) => {
	const {className} = props
	return (
		<button
			type="button"
			className={className}
		>	
		{props.icon && 
			<img src={props.icon} alt={props.title} className="w-5 h-5" />
		}
			{props.title}
		</button>
	);
};

export default ButtonComponent;
