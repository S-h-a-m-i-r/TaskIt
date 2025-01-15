
interface ButtonProps {
  icon: string;
  title: string;
}

const ButtonComponent = (props: ButtonProps) => {
  return (
    <button
    type="button"
    className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-500 font-sans font-normal py-2 px-4 rounded-md bg-transparent mt-2"
  >
    <img src={props.icon} alt={props.title} className="w-5 h-5" />  
    {props.title}
  </button>
  )
}

export default ButtonComponent
