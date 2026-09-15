import { useState } from "react";
import "./AddHotel.css";

import { Hotelfacilities } from "./Hotelfacilities";
import { HotelImageAdd } from "./HotelImageAdd";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { firestore } from "../Firebase/Firebase";


export const AddHotel = () => {

  const [showImageAdd, setShowImageAdd] = useState(false);

  const [hotelData, setHotelData] = useState({

    hotelType: "",
    description: "",
    hotelName: "",

    country: "",
    state: "",
    city: "",

    pricePerNight: "",
    discount: "",
    gstTax: "",

    roomType: "",
    bedType: "",
    roomSize: ""

  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setHotelData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const docRef = await addDoc(
        collection(firestore, "Hoteldetails"),
        {

          hotelType: hotelData.hotelType,

          hotelName: hotelData.hotelName,

          description: hotelData.description,


          location: {

            country: hotelData.country,

            state: hotelData.state,

            city: hotelData.city

          },


          pricing: {

            pricePerNight:
              Number(hotelData.pricePerNight),

            discount:
              Number(hotelData.discount),

            gstTax:
              Number(hotelData.gstTax)

          },


          roomDetails: {

            roomType: hotelData.roomType,

            bedType: hotelData.bedType,

            roomSize: hotelData.roomSize

          },


          createdAt: serverTimestamp()

        }
      );


      console.log(
        "Hotel added with ID:",
        docRef.id
      );

      alert("Hotel added successfully!");


      // Clear form

      setHotelData({

        hotelType: "",
        description: "",
        hotelName: "",

        country: "",
        state: "",
        city: "",

        pricePerNight: "",
        discount: "",
        gstTax: "",

        roomType: "",
        bedType: "",
        roomSize: ""

      });


    } catch (error) {

      console.error(
        "Error adding hotel:",
        error
      );

      alert("Hotel adding failed");

    }

  };


  return (

    <form onSubmit={handleSubmit}>

      <div className="inputContainer">


        {/* Hotel Details */}

        <div className="inputBoxDiv">

          <h3>Hotel Type</h3>

          <input
            className="inputBoxHtlAdd"
            type="text"
            name="hotelType"
            placeholder="Hotel Type"
            value={hotelData.hotelType}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="text"
            name="description"
            placeholder="Description"
            value={hotelData.description}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="text"
            name="hotelName"
            placeholder="Hotel Name"
            value={hotelData.hotelName}
            onChange={handleChange}
          />

        </div>



        {/* Location */}

        <div className="inputBoxDiv">

          <h3>Location</h3>

          <input
            className="inputBoxHtlAdd"
            type="text"
            name="country"
            placeholder="Country"
            value={hotelData.country}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="text"
            name="state"
            placeholder="State"
            value={hotelData.state}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="text"
            name="city"
            placeholder="City / Location"
            value={hotelData.city}
            onChange={handleChange}
          />

        </div>



        {/* Pricing */}

        <div className="inputBoxDiv">

          <h3>Pricing Details</h3>

          <input
            className="inputBoxHtlAdd"
            type="number"
            name="pricePerNight"
            placeholder="Price Per Night"
            value={hotelData.pricePerNight}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="number"
            name="discount"
            placeholder="Discount"
            value={hotelData.discount}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="number"
            name="gstTax"
            placeholder="GST / Tax"
            value={hotelData.gstTax}
            onChange={handleChange}
          />


          <h4>
            Total Price: ₹
            {
              Number(hotelData.pricePerNight || 0)
              -
              Number(hotelData.discount || 0)
              +
              Number(hotelData.gstTax || 0)
            }
          </h4>

        </div>



        {/* Room Details */}

        <div className="inputBoxDiv">

          <h3>Room Details</h3>

          <input
            className="inputBoxHtlAdd"
            type="text"
            name="roomType"
            placeholder="Room Type"
            value={hotelData.roomType}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="text"
            name="bedType"
            placeholder="Bed Type"
            value={hotelData.bedType}
            onChange={handleChange}
          />


          <input
            className="inputBoxHtlAdd"
            type="text"
            name="roomSize"
            placeholder="Room Size"
            value={hotelData.roomSize}
            onChange={handleChange}
          />

        </div>

      </div>



      {/* Images */}

      {!showImageAdd ? (

        <button
          type="button"
          className="ImageAddBtn"
          onClick={() => setShowImageAdd(true)}
        >
          Add Images
        </button>

      ) : (

        <HotelImageAdd
          closeImageAdd={() =>
            setShowImageAdd(false)
          }
        />

      )}



      {!showImageAdd && <Hotelfacilities />}



      {/* Submit */}

      <button
        type="submit"
        className="hotelSubmitBtn"
      >
        Add Hotel
      </button>

    </form>

  );
};