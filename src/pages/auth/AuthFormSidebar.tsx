
interface AuthFormSidebarProps {
  image: string;
  width: string;
}

const AuthFormSidebar = (props: AuthFormSidebarProps) => {
  return (
      <div className='w-full max-w-[728px] flex justify-center' style={{ width: `${props.width}vw`, height: '724px' }}>
        <img src={props.image} alt="Taskit Logo"/>
      </div>
  )
}

export default AuthFormSidebar
