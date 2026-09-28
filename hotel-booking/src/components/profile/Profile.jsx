import { useEffect, useState } from "react";
import {  firestore } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navebar } from "../Navebar/Navebar";
import "./Profile.css";
//import "./profiles.css";
import { userAuth } from "../context/userauth";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Logout/Logout";

export const Profile = () => {

    const { user, loading } = userAuth();
    const navigate = useNavigate();
     const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {

        if (loading) return;
        if (!user) return;

        const getProfile = async () => {

            try {

                const userRef = doc(
                    firestore,
                    "Users",
                    user.uid
                );

                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {

                    setProfile({
                        ...userSnap.data(),
                        email: user.email || "",
                        name: user.displayName || "User",
                        photo: user.photoURL || ""
                    });

                } else {

                    setProfile({
                        name: user.displayName || "User",
                        email: user.email || "",
                        phone: "",
                        city: "",
                        photo: user.photoURL || ""
                    });

                }

            } catch (error) {

                console.log("Profile error:", error);

            }
        };

        getProfile();

    }, [user, loading]);


    if (loading) {
        return <p>Loading user...</p>;
    }

    if (!user) {
        return <p>Please login to view your profile.</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }


    return (
        <>
            <Navebar />

            <section className="profileSection">

                <div className="profileContainer">

                    {/* Profile Header */}

                    <div className="profileHeader">

                        <div className="profileImageBox">

                            {profile.photo ? (

                                <img
                                    src={profile.photo}
                                    alt="Profile"
                                />

                            ) : (

                                <div className="profileInitial">
                                    {profile.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                            )}

                        </div>


                        <div className="profileHeaderInfo">

                            <h2>
                                {profile.name || "User"}
                            </h2>

                            <p>
                                {profile.email}
                            </p>

                            {user.emailVerified && (
                                <span className="verifiedBadge">
                                    ✓ Verified Account
                                </span>
                            )}

                        </div>

                    </div>


                    {/* Personal Information */}

                    <div className="profileCard">

                        <div className="cardHeading">

                            <h3>Personal Information</h3>

                            <button>
                                Edit Profile
                            </button>

                        </div>


                        <div className="profileDetails">

                            <div className="detailItem">

                                <span className="detailIcon">
                                    👤
                                </span>

                                <div>
                                    <small>Full Name</small>

                                    <p>
                                        {profile.name || "Not added"}
                                    </p>
                                </div>

                            </div>


                            <div className="detailItem">

                                <span className="detailIcon">
                                    ✉
                                </span>

                                <div>
                                    <small>Email Address</small>

                                    <p>
                                        {profile.email || "Not added"}
                                    </p>
                                </div>

                            </div>


                            <div className="detailItem">

                                <span className="detailIcon">
                                    📱
                                </span>

                                <div>
                                    <small>Mobile Number</small>

                                    <p>
                                        {profile.phone || "Not added"}
                                    </p>
                                </div>

                            </div>


                            <div className="detailItem">

                                <span className="detailIcon">
                                    📍
                                </span>

                                <div>
                                    <small>Location</small>

                                    <p>
                                        {profile.city || "Not added"}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Account Information */}

                    <div className="profileCard">

                        <h3>Account Information</h3>

                        <div className="accountInfo">

                            <div>
                                <small>Account Status</small>

                                <p className="activeStatus">
                                    Active
                                </p>
                            </div>

                            <div>
                                <small>User ID</small>

                                <p>
                                    {user.uid}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Quick Actions */}

                    <div className="profileCard">

                        <h3>Quick Actions</h3>

                        <div className="profileActions">

                            {/* My Bookings */}

                            <button
                                className="profileActionBtn"
                                onClick={() => navigate("/Mybooking")}
                            >
                                <span className="actionIcon">
                                    🧳
                                </span>

                                <span>
                                    <strong>My Bookings</strong>
                                    <small>
                                        View your hotel bookings
                                    </small>
                                </span>

                                <span className="actionArrow">
                                    →
                                </span>

                            </button>


                            {/* My Property Listings */}

                            <button
                                className="profileActionBtn"
                                onClick={() => navigate("/Myhotels")}
                            >
                                <span className="actionIcon">
                                    🏨
                                </span>

                                <span>
                                    <strong>My Property Listings</strong>
                                    <small>
                                        Manage your listed properties
                                    </small>
                                </span>

                                <span className="actionArrow">
                                    →
                                </span>

                            </button>


                            {/* Logout */}

                            <button
                                className="profileActionBtn logoutAction"
                                onClick={() => setShowLogoutPopup(true)}
                            >
                                <span className="actionIcon">
                                    ↪
                                </span>

                                <span>
                                    <strong>Logout</strong>
                                    <small>
                                        Sign out from your account
                                    </small>
                                </span>

                                <span className="actionArrow">
                                    →
                                </span>

                            </button>

                        </div>

                    </div>
                    {showLogoutPopup && (
                                    <Logout
                                        closePopup={() => setShowLogoutPopup(false)}
                                    />
                                )}
                </div>

            </section>
        </>
    );
};