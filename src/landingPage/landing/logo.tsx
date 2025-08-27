import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg'

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2" aria-label="TaskAway Home">
    <img
      src={logo}
      alt="TaskAway Logo"
      width={186}
      height={40}
    />
  </Link>
);
