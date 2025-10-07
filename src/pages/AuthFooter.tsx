import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { message } from "antd";
import useAuthStore from "../stores/authStore";
interface AuthFooterProps {
  tab: "Login" | "Signup";
}

const AuthFooter = ({ tab }: AuthFooterProps) => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuthStore();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (!credentialResponse.credential) {
        message.error("Google authentication failed");
        return;
      }

      const res = await loginWithGoogle(credentialResponse.credential);

      message.success("Logged in successfully with Google");

      const role = res.user.role;
      if (role === "MANAGER") navigate("/manager");
      else if (role === "ADMIN") navigate("/admin");
      else if (role === "BASIC") navigate("/basic");
      else navigate("/");
    } catch (err) {
      const error = err as Error;
      message.error(error.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    message.error("Google authentication failed");
  };

  return (
    <div className="w-full max-w-[388px] flex flex-col gap-8 ">
      <div className="flex items-center w-full gap-2">
        <span className="flex-grow border border-primary" />
        <span className="text-secondary-100 font-sans whitespace-nowrap">
          Or
        </span>
        <span className="flex-grow border border-primary" />
      </div>
      {tab === "Login" && (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          text="signin_with"
          shape="rectangular"
          theme="outline"
          size="large"
          width="100%"
        />
      )}

      {tab == "Login" ? (
        <div className="flex justify-center gap-3 w-full">
          {" "}
          Don't you have an account?{" "}
          <Link to="/signup" className="text-primary-50">
            {" "}
            Signup{" "}
          </Link>
        </div>
      ) : (
        <div className="flex justify-center gap-3">
          {" "}
          Already have an account?{" "}
          <span>
            <Link to="/login" className="text-primary-50">
              {" "}
              Signin{" "}
            </Link>
          </span>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default AuthFooter;
