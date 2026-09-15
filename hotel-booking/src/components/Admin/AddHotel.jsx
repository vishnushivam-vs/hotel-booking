import { useState } from "react"
import "./AddHotel.css"
import { Hotelfacilities } from "./Hotelfacilities"
import { HotelImageAdd } from "./HotelImageAdd"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { firestore } from "../Firebase/Firebase"

export const AddHotel = () => {
    const [showImageAdd, setShowImageAdd] = useState(false)
    const [hotelData, setHoteldata] = useState({

        hotelType: "",
        description: "",
        hotelName: "",

        country: "",
        state: "",
        city: "",

        price: "",
        discount: "",
        tax: "",

        roomType: "",
        bedType: "",
        roomSize: "",

        hotelThumbanaile: "",
        images: [""]
    });

    const handleChange = ((e) => {
        const { name, value } = e.target;

        setHoteldata((prev) => ({
            ...prev,
            [name]: value
        }))
    });

    const handelSubmit = async (e) => {

        e.preventDefault();
        try {

            const docRef = await addDoc(
                collection(firestore, "Hoteldetails"), {
            
                hotelType: hotelData.hotelType,
                hotelName: hotelData.hotelName,
                description: hotelData.description,

                location: {
                    country: hotelData.country,
                    state: hotelData.state,
                    city: hotelData.city,
                },

                pricing: {
                    priceperNight: Number(hotelData.price),
                    discount: Number(hotelData.discount),
                    tax: Number(hotelData.tax)
                },

                roomDetails: {
                    roomType: hotelData.roomType,
                    bedType: hotelData.bedType,
                    roomSize: hotelData.roomSize
                },

                createdAt: serverTimestamp()
            }
            )
            console.log("adddetalis", hotelData);
            console.log(
                "Hotel added with ID:",
                docRef.id
            );

        } catch (error) {
            console.log("submit error", error);

        }
    }

    return (
        <>
            <div className="inputContainer">
                <div className="inputBoxDiv">
                    <h3>Hotel Type</h3>
                    <input className="inputBoxHtlAdd" type="text"
                        placeholder="Hotel Type"
                        name="hotelType"
                        value={hotelData.hotelType}
                        onChange={handleChange} />
                    <input className="inputBoxHtlAdd" type="text" placeholder="Description"
                        name="description"
                        value={hotelData.description}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="hotel Name"
                        name="hotelName"
                        value={hotelData.hotelName}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBoxDiv">
                    <h3>Location</h3>
                    <input className="inputBoxHtlAdd" type="text" placeholder="country"
                        name="country"
                        value={hotelData.country}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="Satte"
                        name="state"
                        value={hotelData.state}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="city/ location"
                        name="city"
                        value={hotelData.city}
                        onChange={handleChange}
                    />

                </div>
                <div className="inputBoxDiv">
                    <h3>Pricing Details</h3>
                    <input className="inputBoxHtlAdd" type="text" placeholder="price Per Night"
                        name="price"
                        value={hotelData.price}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="Discount"
                        name="discount"
                        value={hotelData.discount}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="gst/tax"
                        value={hotelData.tax}
                        name="tax"
                        onChange={handleChange}
                    />
                    <h4>totalPrice:</h4>
                </div>
                <div className="inputBoxDiv">
                    <h3>Room Details</h3>
                    <input className="inputBoxHtlAdd" type="text" placeholder="Room Type"
                        name="roomType"
                        value={hotelData.roomTyp}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="Bed Type"
                        name="bedType"
                        value={hotelData.bedType}
                        onChange={handleChange}
                    />
                    <input className="inputBoxHtlAdd" type="text" placeholder="Room Size"
                        name="roomSize"
                        value={hotelData.roomSize}
                        onChange={handleChange}
                    />
                </div>

            </div>

            {!showImageAdd ?
                <button className="ImageAddBtn"
                    onClick={() => setShowImageAdd(true)}
                >Add images</button>
                :
                showImageAdd && (

                    <HotelImageAdd closeImageAdd={() => setShowImageAdd(false)} />
                )
            }
            {!showImageAdd && <Hotelfacilities />}

            <button className="submitBtn"
                onClick={handelSubmit}
            >Submit</button>
        </>
    )
}
