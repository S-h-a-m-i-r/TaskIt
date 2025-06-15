interface AuthFormSidebarProps {
	image: string;
	width?: string;
}

const AuthFormSidebar = (props: AuthFormSidebarProps) => {
	return (
		<div className="w-full" style={{ width: `${props?.width}vw` }}>
			<img src={props.image} alt="Taskit Logo" className="w-full rounded-lg" />
		</div>
	);
};

export default AuthFormSidebar;
