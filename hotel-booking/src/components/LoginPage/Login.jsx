import { signInWithPopup } from "firebase/auth";
import "./Login.css";
import { auth, provider } from "../Firebase/Firebase";

export const Login = () => {
    const handleGoogleLogin = async () => {
        try {
           const result = await  signInWithPopup(auth, provider)
              console.log("Logged in user:", result.user);
        } catch (error) {
            console.log("Google login error", error);
            
        }
    }
    return (
        <div className='loginPage'>
            <div className='loginCard'>
                <div className="loginLogo">
                    🏨
                </div>
                <h1>Welcome Back</h1>

                <p className="loginSubtitle">
                    Sign in to continue your hotel booking journey
                </p>

                <button
                    className="googleLoginBtn"
                    onClick={handleGoogleLogin}
                >
                    <span className="googleIcon">G</span>
                    Continue with Google
                </button>

                <p className="loginTerms">
                    By continuing, you agree to our Terms & Privacy Policy.
                </p>
            </div>
        </div>
    )
}
