import ButtonComponent from '../components/ButtonComponent'
import gIcon from '../assets/icons/Google_icon.svg';
import { Link } from 'react-router-dom';
interface AuthFooterProps {
  tab: 'Login' | 'Signup';
}

const AuthFooter = ({ tab }: AuthFooterProps) => {
  return (
    <div className='w-full max-w-[388px] flex flex-col gap-8 '>
    <div className='flex items-center w-full gap-2'>
        <span className='flex-grow border border-primary' />
        <span className='text-secondary-100 font-sans whitespace-nowrap'>Or</span>
        <span className='flex-grow border border-primary' />
      </div>
      <ButtonComponent title= 'Sign in with google' icon={gIcon}/>
      { tab  == 'Login' ? (<div className='flex justify-center gap-3'> Don't you have an account? <Link to='/signup'> Signup </Link></div>) : (<div className='flex justify-center gap-3'> Already have an account? <span><Link to='/loginin'> signin </Link></span></div>)}
      <div>
      </div>
      </div>
  )
}

export default AuthFooter
