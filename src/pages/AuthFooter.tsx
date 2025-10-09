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
      console.log("🔍 Google Auth Debug - Starting authentication process");
      
      if (!credentialResponse.credential) {
        console.error("❌ Google Auth Error - No credential received");
        message.error("Google authentication failed: No credential received");
        return;
      }

      console.log("✅ Google Auth Debug - Credential received, length:", credentialResponse.credential.length);
      console.log("🔍 Google Auth Debug - Calling loginWithGoogle service");

      const res = await loginWithGoogle(credentialResponse.credential);

      console.log("✅ Google Auth Debug - Service response:", res);

      if (!res?.user) {
        console.error("❌ Google Auth Error - Invalid response structure:", res);
        message.error("Google authentication failed: Invalid response from server");
        return;
      }

      console.log("✅ Google Auth Debug - User data received:", {
        id: res.user._id,
        email: res.user.email,
        role: res.user.role,
        firstName: res.user.firstName
      });

      message.success("Logged in successfully with Google");

      const role = res.user.role;
      console.log("🔍 Google Auth Debug - Navigating based on role:", role);
      
      if (role === "MANAGER") navigate("/manager");
      else if (role === "ADMIN") navigate("/admin");
      else if (role === "BASIC") navigate("/basic");
      else navigate("/");
      
      console.log("✅ Google Auth Debug - Navigation completed");
    } catch (err) {
      console.error("❌ Google Auth Error - Full error object:", err);
      
      // Handle different types of errors
      if (err && typeof err === 'object') {
        const error = err as { response?: any; request?: any; message?: string };
        
        // Check for specific error types
        if (error.response) {
          // Server responded with error status
          console.error("❌ Google Auth Error - Server response error:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data
          });
          
          const errorMessage = error.response.data?.message || 
                              error.response.data?.error || 
                              `Server error: ${error.response.status}`;
          message.error(`Google authentication failed: ${errorMessage}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error("❌ Google Auth Error - Network error:", error.request);
          message.error("Google authentication failed: Network error - please check your connection");
        } else if (error.message) {
          // Something else happened
          console.error("❌ Google Auth Error - Other error:", error.message);
          message.error(`Google authentication failed: ${error.message}`);
        } else {
          console.error("❌ Google Auth Error - Unknown error type:", error);
          message.error("Google authentication failed: Unknown error occurred");
        }
      } else {
        console.error("❌ Google Auth Error - Non-object error:", err);
        message.error("Google authentication failed: Unexpected error format");
      }
    }
  };

  const handleGoogleError = (error?: { type?: string }) => {
    console.error("❌ Google Auth Error - Google OAuth error:", error);
    
    if (error) {
      // Handle specific Google OAuth errors
      if (error.type === 'popup_closed_by_user') {
        message.error("Google authentication cancelled by user");
      } else if (error.type === 'popup_blocked') {
        message.error("Google authentication popup was blocked. Please allow popups and try again.");
      } else if (error.type === 'access_denied') {
        message.error("Google authentication access denied. Please try again.");
      } else if (error.type === 'invalid_request') {
        message.error("Google authentication invalid request. Please refresh and try again.");
      } else {
        message.error(`Google authentication failed: ${error.type || 'Unknown error'}`);
      }
    } else {
      message.error("Google authentication failed: Please try again");
    }
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

      {/* Terms and Conditions Link */}
      <div className="flex justify-center text-center">
        <p className="text-sm text-gray-500">
          By continuing, you agree to our <br />
          <Link
            to="/terms"
            className="text-primary-50 hover:text-primary-200 underline"
          >
            Terms and Conditions
          </Link>
          &nbsp;and&nbsp;
          <Link
            to="/terms?section=privacy"
            className="text-primary-50 hover:text-primary-200 underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthFooter;
