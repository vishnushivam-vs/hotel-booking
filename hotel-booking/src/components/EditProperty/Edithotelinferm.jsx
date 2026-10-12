

export const Edithotelinferm = ({ hotelData, handleChange, setHotelData }) => {

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


    return (
        <div>
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
                            name="hotelName"
                            value={hotelData.hotelName || ""}
                            onChange={handleChange}

                        />
                    </div>


                    <div className="inputGroup">
                        <label>Property Type</label>

                        <select
                            name="hotelType"
                            value={hotelData.hotelType || ""}
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
                        name="description"
                        value={hotelData.description}
                        onChange={handleChange}
                        placeholder="Enter hotel description"
                    />

                </div>

            </section>

            <section className="editSection">
                <div className="sectionHeading">
                    <h2>Location</h2>
                    <p>Property location details</p>
                </div>

                <div className="formGrid three">
                    <div className="inputGroup">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={hotelData.location.country}
                            onChange={handleLocationChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={hotelData.location.state}
                            onChange={handleLocationChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={hotelData.location.city}
                            onChange={handleLocationChange}
                        />
                    </div>
                </div>
            </section>


            <section className="editSection">
                <div className="sectionHeading">
                    <h2>Pricing</h2>
                    <p>Manage your property's pricing</p>
                </div>

                <div className="formGrid three">
                    <div className="inputGroup">
                        <label>Price Per Night</label>
                        <input
                            type="number"
                            name="priceperNight"
                            value={hotelData.pricing.priceperNight}
                            onChange={handlePricingChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Discount (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={hotelData.pricing.discount}
                            onChange={handlePricingChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Tax (₹)</label>
                        <input
                            type="number"
                            name="tax"
                            value={hotelData.pricing.tax}
                            onChange={handlePricingChange}
                        />
                    </div>
                </div>
            </section>

            <section className="editSection">
                <div className="sectionHeading">
                    <h2>Room Details</h2>
                    <p>Details about the available room</p>
                </div>

                <div className="formGrid three">
                    <div className="inputGroup">
                        <label>Room Type</label>
                        <input
                            type="text"
                            name="roomType"
                            value={hotelData.roomDetails.roomType}
                            onChange={handleRoomChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Bed Type</label>
                        <input
                            type="text"
                            name="bedType"
                            value={hotelData.roomDetails.bedType}
                            onChange={handleRoomChange}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Room Size</label>
                        <input
                            type="text"
                            name="roomSize"
                            value={hotelData.roomDetails.roomSize}
                            onChange={handleRoomChange}
                        />
                    </div>
                </div>
            </section>


            <div className="facilityGrid">
                {facilityOptions.map((facility) => (
                    <label
                        className="facilityItem"
                        key={facility}
                    >
                        <input
                            type="checkbox"
                            checked={hotelData.facilities.includes(facility)}
                            onChange={() => handleFacilityChange(facility)}
                        />
                        <span>{facility}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
