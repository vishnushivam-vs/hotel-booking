import { useState } from "react";


export const Hotelfacilities = ({ setFacilities }) => {

    const [selectedFacilities, setselectedFacilities] = useState([]);
    const handleFecilitesChange = (e) => {
        const value = e.target.value;
        let updatedfacilities;
        if (e.target.checked) {
            updatedfacilities = [
                ...selectedFacilities,
                value
            ];

            setselectedFacilities(updatedfacilities)
            setFacilities(updatedfacilities)
        } else {
            updatedfacilities = selectedFacilities.filter(
                (facility) => facility !== value)
            setselectedFacilities(updatedfacilities);
            setFacilities(updatedfacilities)

        }
    }
    return (
        <div>
            <div className="facilitiesBox">
                <h3 >Hotel Facilities</h3>

                <div className="facilitiesGrid">

                    <label>
                        <input type="checkbox" name="facilities" value="Free WiFi"
                            onChange={handleFecilitesChange}
                        />
                        Free WiFi
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Swimming Pool"
                            onChange={handleFecilitesChange}
                        />
                        Swimming Pool
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Parking"
                            onChange={handleFecilitesChange}
                        />
                        Parking
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Restaurant"
                            onChange={handleFecilitesChange}
                        />
                        Restaurant
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Room Service"
                            onChange={handleFecilitesChange}
                        />
                        Room Service
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Air Conditioning"
                            onChange={handleFecilitesChange}
                        />
                        Air Conditioning
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="TV"
                            onChange={handleFecilitesChange}
                        />
                        TV
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Gym"
                            onChange={handleFecilitesChange}
                        />
                        Gym
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Spa"
                            onChange={handleFecilitesChange}
                        />
                        Spa
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="24/7 Front Desk"
                            onChange={handleFecilitesChange}
                        />
                        24/7 Front Desk
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Airport Shuttle"
                            onChange={handleFecilitesChange}
                        />
                        Airport Shuttle
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Breakfast"
                            onChange={handleFecilitesChange}
                        />
                        Breakfast
                    </label>

                    <label>


                        <input type="checkbox" name="facilities" value="Laundry"
                            onChange={handleFecilitesChange}
                        />
                        Laundry
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Elevator"
                            onChange={handleFecilitesChange}
                        />
                        Elevator
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Pet Friendly"
                            onChange={handleFecilitesChange}
                        />
                        Pet Friendly
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Family Rooms"
                            onChange={handleFecilitesChange}
                        />
                        Family Rooms
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Non-Smoking Rooms"
                            onChange={handleFecilitesChange}
                        />
                        Non-Smoking Rooms
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Balcony"
                            onChange={handleFecilitesChange}
                        />
                        Balcony
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Garden"
                            onChange={handleFecilitesChange}
                        />
                        Garden
                    </label>

                    <label>
                        <input type="checkbox" name="facilities" value="Bar"
                            onChange={handleFecilitesChange}
                        />
                        Bar
                    </label>

                </div>
            </div>
        </div>
    )
}
