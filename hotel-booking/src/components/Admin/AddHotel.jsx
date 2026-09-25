import { useState } from "react"
import "./AddHotel.css"
import { Hotelfacilities } from "./Hotelfacilities"
import { HotelImageAdd } from "./HotelImageAdd"
import { addDoc, collection, serverTimestamp, } from "firebase/firestore"
import { firestore } from "../Firebase/Firebase"
import { Navebar } from "../Navebar/Navebar"
//import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


export const AddHotel = () => {
    const [showImageAdd, setShowImageAdd] = useState(false)
    const [loading, setLoading] = useState(false)
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
        images: [],


        facilities: []
    });

    const handleChange = ((e) => {
        const { name, value } = e.target;

        setHoteldata((prev) => ({
            ...prev,
            [name]: value
        }))
    });
    const uploadToCloudinary = async (file) => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "Vishnu");

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/xbnoalu4/image/upload",
            {
                method: "POST",
                body: formData
            }
        )

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Cloudinary error:", errorData);
            throw new Error("Cloudinary image upload failed")
        }

        const data = await response.json()

        return data.secure_url;
    }


    const handelSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)
        try {

            if (!hotelData.hotelThumbanaile) {
                alert("Please select hotel thumbnail");
                return;
            }
            if (hotelData.images.length === 0) {
                alert("Please select at least one room image");
                return;
            }

            const thumbnailUrl = await uploadToCloudinary(
                hotelData.hotelThumbanaile
            )
            console.log("Thumbnail URL:", thumbnailUrl);
            const roomImageUrls = [];

            for (let i = 0; i < hotelData.images.length; i++) {

                const imageUrl = await uploadToCloudinary(
                    hotelData.images[i]
                )
                roomImageUrls.push(imageUrl);
            }

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
                    discount: Number(String(hotelData.discount).replace("%", "")) || 0,
                    tax: Number(hotelData.tax)
                },

                roomDetails: {
                    roomType: hotelData.roomType,
                    bedType: hotelData.bedType,
                    roomSize: hotelData.roomSize
                },


                facilities: hotelData.facilities,

                hotelThumbanaile: thumbnailUrl,
                images: roomImageUrls,

                createdAt: serverTimestamp()
            }
            )
            const hotelId = docRef.id;

            alert("hotel data uplod sucssefully")
        } catch (error) {

            console.log("submit error", error);
            alert("hotela data uplod fail", error)

        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Navebar />
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
                        value={hotelData.roomType}
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

                    <HotelImageAdd
                        closeImageAdd={() => setShowImageAdd(false)}
                        onImagesChange={(images) => {
                            setHoteldata((prev) => ({
                                ...prev,
                                hotelThumbanaile: images.thumnail,
                                images: images.roomImages
                            }))
                        }}
                    />
                )
            }
            {!showImageAdd && <Hotelfacilities
                setFacilities={(facilities) => {
                    setHoteldata((prev) => ({
                        ...prev,
                        facilities: facilities
                    }));
                }}
            />}

            <button className="submitBtn"
                onClick={handelSubmit}
            >{loading ? "Uploading..." : "Submit"}</button>
        </>
    )
}
