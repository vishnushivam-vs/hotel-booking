import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { Navebar } from "../Navebar/Navebar";
import "./EditHotel.css";
import { EditImg } from "./EditImg";
import { Edithotelinferm } from "./Edithotelinferm";

export const EdithotelData = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const hotelId = location.state?.hotel.id;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hotelData, setHotelData] = useState({

        hotelName: "",
        hotelType: "",
        description: "",

        location: {
            country: "",
            state: "",
            city: ""
        },

        pricing: {
            priceperNight: "",
            discount: "",
            tax: ""
        },

        roomDetails: {
            roomType: "",
            bedType: "",
            roomSize: ""
        },

        facilities: [],

        hotelThumbanaile: "",
        images: []
    });

    useEffect(() => {

        if (!hotelId) {
            alert("Hotel ID not found");
            navigate("/Myhotels");
            return;
        }

        const getHotel = async () => {

            try {

                const hotelRef = doc(
                    firestore,
                    "Hoteldetails",
                    hotelId
                );

                const hotelSnap = await getDoc(hotelRef);

                if (!hotelSnap.exists()) {
                    alert("Hotel not found");
                    navigate("/Myhotels");
                    return;
                }

                const data = hotelSnap.data();

                setHotelData({
                    hotelName: data.hotelName || "",
                    hotelType: data.hotelType || "",
                    description: data.description || "",

                    location: {
                        country: data.location?.country || "",
                        state: data.location?.state || "",
                        city: data.location?.city || ""
                    },

                    pricing: {
                        priceperNight: data.pricing?.priceperNight ?? "",
                        discount: data.pricing?.discount ?? "",
                        tax: data.pricing?.tax ?? ""
                    },

                    roomDetails: {
                        roomType: data.roomDetails?.roomType || "",
                        bedType: data.roomDetails?.bedType || "",
                        roomSize: data.roomDetails?.roomSize || ""
                    },

                    facilities: data.facilities || [],

                    hotelThumbanaile:
                        data.hotelThumbanaile || "",

                    images: data.images || []
                });

            } catch (error) {

                console.error("Error loading hotel:", error);

            } finally {
                setLoading(false);
            }
        };

        getHotel();

    }, [hotelId, navigate]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setHotelData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!hotelId) {
            alert("Hotel ID not found");
            return;
        }
        try {
            setSaving(true);

            const hotelRef = doc(
                firestore,
                "Hoteldetails",
                hotelId
            );

            await updateDoc(hotelRef, {
                hotelName: hotelData.hotelName.trim(),
                hotelType: hotelData.hotelType,
                description: hotelData.description.trim(),

                location: {
                    country: hotelData.location.country.trim(),
                    state: hotelData.location.state.trim(),
                    city: hotelData.location.city.trim()
                },

                pricing: {
                    priceperNight: Number(
                        hotelData.pricing.priceperNight
                    ),
                    discount: Number(
                        hotelData.pricing.discount
                    ) || 0,
                    tax: Number(
                        hotelData.pricing.tax
                    ) || 0
                },

                roomDetails: {
                    roomType: hotelData.roomDetails.roomType,
                    bedType: hotelData.roomDetails.bedType,
                    roomSize: hotelData.roomDetails.roomSize
                },

                facilities: hotelData.facilities,
                hotelThumbanaile: hotelData.hotelThumbanaile,
                images: hotelData.images
            });

            alert("Hotel updated successfully!");
            navigate("/Myhotels");

        } catch (error) {
            console.error("Error updating hotel:", error);
            alert("Failed to update hotel");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navebar />

                <div className="editLoading">
                    Loading hotel details...
                </div>
            </>
        );
    }

    return (
        <div>

            <Navebar />
            <div className="editHotelPage">

                <div className="editHotelHeader">

                    <div>
                        <h1>Edit Property</h1>
                        <p>
                            Update your property information,
                            pricing and amenities.
                        </p>
                    </div>

                    <button className="backBtn"
                        onClick={() => navigate("/Myhotels")}
                    >
                        ← Back to My Hotels
                    </button>

                </div>

                <form onSubmit={handleUpdate}>

                    <div className="editHotelForm">

                        <Edithotelinferm
                            hotelData={hotelData}
                            setHotelData={setHotelData}
                            handleChange={handleChange}
                        />


                        <EditImg
                            hotelData={hotelData}
                            setHotelData={setHotelData}
                            hotelId={hotelId}
                        />


                        <section className="editSection">

                            <div className="sectionHeading">

                                <h2>Property Status</h2>

                                <p>
                                    Manage your property's availability
                                </p>

                            </div>


                            <div className="statusBox">

                                <div>

                                    <h3>Property Active</h3>

                                    <p>
                                        Your property is currently
                                        visible to customers.
                                    </p>

                                </div>

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked
                                        readOnly
                                    />

                                    <span></span>

                                </label>

                            </div>

                        </section>


                        <div className="editActions">

                            <button
                                type="button"
                                className="cancelEditBtn"
                                onClick={() => navigate("/Myhotels")}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="saveHotelBtn"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};