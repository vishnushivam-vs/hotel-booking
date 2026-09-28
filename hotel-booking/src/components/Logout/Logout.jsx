import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import "./Logout.css";

export const Logout = ({ closePopup }) => {

    const handleLogout = async () => {
        try {
            await signOut(auth);

            closePopup();


        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="logoutOverlay">

            <div className="logoutPopup">

                <div className="logoutIcon">
                    ↪
                </div>

                <h3>Logout?</h3>

                <p>
                    Are you sure you want to logout from your account?
                </p>

                <div className="logoutActions">

                    <button
                        className="cancelBtn"
                        onClick={closePopup}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirmBtn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
};