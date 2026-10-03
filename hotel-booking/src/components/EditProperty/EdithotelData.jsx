import React, { useEffect, useState } from "react";
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

export const EdithotelData = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // Myhotels page-il ninnu hotel id state vazhi varum
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

    const facilityOptions = [
        "Free WiFi",
        "Swimming Pool",
        "Parking",
        "Restaurant",
        "Room Service",
        "Air Conditioning",
        "TV",
        "Gym",
        "Spa",
        "24/7 Front Desk",
        "Airport Shuttle",
        "Breakfast",
        "Laundry",
        "Elevator",
        "Pet Friendly",
        "Family Rooms",
        "Non-Smoking Rooms",
        "Balcony",
        "Garden",
        "Bar"
    ];

    // ==============================
    // GET HOTEL
    // ==============================

    useEffect(() => {

      /*  if (!hotelId) {
            alert("Hotel ID not found");
            navigate("/Myhotels");
            return;
        }*/

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

                console.error(
                    "Error loading hotel:",
                    error
                );

            } finally {
                setLoading(false);
            }
        };

        getHotel();

    }, [hotelId, navigate]);


    // ==============================
    // SIMPLE INPUT
    // ==============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setHotelData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // ==============================
    // NESTED INPUT
    // ==============================

    const handleLocationChange = (e) => {

        const { name, value } = e.target;

        setHotelData((prev) => ({
            ...prev,

            location: {
                ...prev.location,
                [name]: value
            }
        }));
    };


    const handlePricingChange = (e) => {

        const { name, value } = e.target;

        setHotelData((prev) => ({
            ...prev,

            pricing: {
                ...prev.pricing,
                [name]: value
            }
        }));
    };




  
    const handleRoomChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setHotelData((prev) => ({

            ...prev,

            roomDetails: {

                ...prev.roomDetails,

                [name]: value
            }
        }));
    };



    // ==============================
    // FACILITIES
    // ==============================

    const handleFacilityChange = (facility) => {

        setHotelData((prev) => {

            const exists =
                prev.facilities.includes(facility);

            return {
                ...prev,

                facilities: exists
                    ? prev.facilities.filter(
                        (item) => item !== facility
                    )
                    : [...prev.facilities, facility]
            };
        });
    };


    // ==============================
    // UPDATE HOTEL
    // ==============================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const hotelRef = doc(
                firestore,
                "Hoteldetails",
                hotelId
            );

            await updateDoc(hotelRef, {

                hotelName:
                    hotelData.hotelName.trim(),

                hotelType:
                    hotelData.hotelType,

                description:
                    hotelData.description.trim(),

                location: {
                    country:
                        hotelData.location.country.trim(),

                    state:
                        hotelData.location.state.trim(),

                    city:
                        hotelData.location.city.trim()
                },

                pricing: {
                    priceperNight:
                        Number(
                            hotelData.pricing.priceperNight
                        ),

                    discount:
                        Number(
                            hotelData.pricing.discount
                        ) || 0,

                    tax:
                        Number(
                            hotelData.pricing.tax
                        ) || 0
                },

                roomDetails: {
                    roomType:
                        hotelData.roomDetails.roomType,

                    bedType:
                        hotelData.roomDetails.bedType,

                    roomSize:
                        hotelData.roomDetails.roomSize
                },

                facilities:
                    hotelData.facilities,

                hotelThumbanaile:
                    hotelData.hotelThumbanaile,

                images:
                    hotelData.images

                // createdAt intentionally NOT changed
            });

            alert("Hotel updated successfully!");

            navigate("/Myhotels");

        } catch (error) {

            console.error(
                "Error updating hotel:",
                error
            );

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

                <form>

              
                    <div className="editHotelForm">


                        {/* ================= HOTEL INFORMATION ================= */}

                        <section className="editSection">

                            <div className="sectionHeading">
                                <h2>Hotel Information</h2>
                                <p>
                                    Basic information about your property
                                </p>
                            </div>


                            <div className="formGrid">

                                <div className="inputGroup">
                                    <label>Hotel Name</label>
                                    <input
                                        type="text"
                                        value={hotelData.hotelName}
                                        onChange={handleChange}
                                        placeholder={hotelData.hotelName}
                                    />
                                </div>


                                <div className="inputGroup">
                                    <label>Property Type</label>

                                    <select
                                        value={hotelData.hotelType}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Property Type
                                        </option>
                                        <option
                                            value="hotel"
                                        >Hotel</option>
                                        <option
                                            value="Resort"
                                        >Resort</option>
                                        <option
                                            value="Villa"
                                        >Villa</option>
                                        <option
                                            value="Apartment"
                                        >Apartment</option>
                                        <option
                                            value="Guest Hpouse"
                                        >Guest House</option>
                                    </select>
                                </div>

                            </div>


                            <div className="inputGroup">

                                <label>Description</label>

                                <textarea
                                    rows="6"
                                    value={hotelData.description}
                                    onChange={handleChange}
                                    placeholder={hotelData.description}
                                ></textarea>

                            </div>

                        </section>



                        {/* ================= LOCATION ================= */}

                        <section className="editSection">

                            <div className="sectionHeading">

                                <h2>Location</h2>

                                <p>
                                    Property location details
                                </p>

                            </div>


                            <div className="formGrid three">

                                <div className="inputGroup">

                                    <label>Country</label>

                                    <input
                                        type="text"
                                        value={hotelData.location.country}
                                        onChange={handleLocationChange}
                                        placeholder={hotelData.location.country}
                                    />

                                </div>


                                <div className="inputGroup">

                                    <label>State</label>

                                    <input
                                        type="text"
                                        value={hotelData.location.state}
                                        onChange={handleLocationChange}
                                        placeholder={hotelData.location.state}
                                    />

                                </div>


                                <div className="inputGroup">

                                    <label>City</label>

                                    <input
                                        type="text"
                                        value={hotelData.location.city}
                                        onChange={handleLocationChange}
                                        placeholder={hotelData.location.city}
                                    />

                                </div>

                            </div>

                        </section>



                        {/* ================= PRICING ================= */}

                        <section className="editSection">

                            <div className="sectionHeading">

                                <h2>Pricing</h2>

                                <p>
                                    Manage your property's pricing
                                </p>

                            </div>


                            <div className="formGrid three">

                                <div className="inputGroup">

                                    <label>
                                        Price Per Night
                                    </label>

                                    <input
                                        type="number"
                                        placeholder={hotelData.pricing.priceperNight}
                                        value={hotelData.pricing.priceperNight}
                                        onChange={handlePricingChange}
                                    />

                                </div>


                                <div className="inputGroup">

                                    <label>
                                        Discount (%)
                                    </label>

                                    <input
                                        type="number"
                                        placeholder={hotelData.pricing.discount}
                                        value={hotelData.pricing.discount}
                                        onChange={handlePricingChange}
                                    />

                                </div>


                                <div className="inputGroup">

                                    <label>
                                        Tax (₹)
                                    </label>

                                    <input
                                        type="number"
                                        placeholder={hotelData.pricing.tax}
                                        value={hotelData.pricing.tax}
                                        onChange={handlePricingChange}
                                    />

                                </div>

                            </div>

                        </section>



                        {/* ================= ROOM DETAILS ================= */}

                        <section className="editSection">

                            <div className="sectionHeading">

                                <h2>Room Details</h2>

                                <p>
                                    Details about the available room
                                </p>

                            </div>


                            <div className="formGrid three">

                                <div className="inputGroup">

                                    <label>Room Type</label>

                                    <input
                                        type="text"
                                        value={hotelData.roomDetails.roomType}
                                        placeholder={hotelData.roomDetails.roomType}
                                        onChange={handleRoomChange}
                                    />

                                </div>


                                <div className="inputGroup">

                                    <label>Bed Type</label>

                                    <input
                                        type="text"
                                        value={hotelData.roomDetails.bedType}
                                        placeholder={hotelData.roomDetails.bedType}
                                        onChange={handleRoomChange}
                                    />

                                </div>


                                <div className="inputGroup">

                                    <label>Room Size</label>

                                    <input
                                        type="text"
                                        value={hotelData.roomDetails.roomSize}
                                        placeholder={hotelData.roomDetails.roomSize}
                                        onChange={handleRoomChange}
                                    />

                                </div>

                            </div>

                        </section>



                        {/* ================= FACILITIES ================= */}

                        <section className="editSection">

                            <div className="sectionHeading">

                                <h2>Facilities & Amenities</h2>

                                <p>
                                    Select the facilities available
                                    at your property
                                </p>

                            </div>


                            <div className="facilityGrid">

                                {facilityOptions.map(
                                    (facility) => (

                                        <label
                                            className="facilityItem"
                                            key={facility}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    hotelData.facilities.includes(
                                                        facility
                                                    )
                                                }
                                                onChange={() =>
                                                    handleFacilityChange(
                                                        facility
                                                    )
                                                }
                                            />

                                            <span>
                                                {facility}
                                            </span>

                                        </label>

                                    )
                                )}

                            </div>

                        </section>



                        {/* ================= PROPERTY IMAGES ================= */}

                        <EditImg
                            hotelData={hotelData}
                            setHotelData={setHotelData}
                            hotelId={hotelId}
                        />





                        {/* ================= PROPERTY STATUS ================= */}

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



                        {/* ================= ACTION BUTTONS ================= */}

                        <div className="editActions">

                            <button
                                type="button"
                                className="cancelEditBtn"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className="saveHotelBtn"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </form>




            </div>


        </div>
    );
};