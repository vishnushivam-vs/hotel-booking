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

import { Modal } from 'flowbite-react'
import { useState } from 'react'
import "./sellModal.css"
import { Input } from './Input'
import { UserAuth } from '../context/Auth'
import { addDoc, collection } from 'firebase/firestore'
import { fetchFromFirestore, firestore } from '../../firebase/firebase'

export const Sell = ({ toggleModalSell, status, setItem }) => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [image, setimage] = useState(null)

  const auth = UserAuth()
  const handleImageUpload = (event) => {
    if (event.target.files) setimage(event.target.files[0])
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!auth?.user) {
      console.log("user", auth.user);

      alert('Please Login to continue')
      return;
    }
    setSubmitting(true) 

    const reaadImageDataUrl =(file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result
          localStorage.setItem(`image-${file.name}`, imageUrl)
          resolve(imageUrl)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    let imageUrll = '';
    if(image){
      try {
        imageUrll = await reaadImageDataUrl(image)
        
      } catch (error) {
        console.log(error);
        alert('failed to read image ')
        return;
        
      }
    }

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim()
    const trimmedprice = price.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedCategory || !trimmedprice || !trimmedDescription) {
      alert('All fields are required')
      setSubmitting(false)
      return;
    }
    try {

      await addDoc(collection(firestore, 'products'), {
        title,
        category,
        price,
        description,
        imageUrll,
        userId: auth.user.uid,
        userName: auth.user.displayName || 'Anonymous',
        createAt: new Date().toDateString(),

      })
      setimage(null)
      const datas = await fetchFromFirestore()
      setItem(datas)
      toggleModalSell()

    } catch (error) {
      console.log(error);
      alert('failed to add the item firestore')

    } finally {
      setSubmitting(false)

    }

  }

  return (
    <div>
      <Modal className='sellModal' show={status}>
        <div>

          <div className='closeImgSellBox'>
            <img className='sellcloseImg' onClick={toggleModalSell} src="./close.svg" alt="" />
          </div>
          <p className='sellModalHead'>sell item</p>

          <form onSubmit={handleSubmit}>
            <Input setInput={setTitle} placeholder='title' />
            <Input setInput={setCategory} placeholder='category' />
            <Input setInput={setPrice} placeholder='price' />
            <Input setInput={setDescription} placeholder='description' />
            <div className='fileaUploadContainer'>
              {image ? (
                <div className='imageUpldBox'>
                  <img className='productImageUpld' src={URL.createObjectURL(image)} alt="" srcset="" />
                </div>
              ) : (
                <label className='imageInputFile'>
                  <input className='fileInput' type="file" required onChange={handleImageUpload} />
                  <div className='fileUpldicon'>
                    <img className='uploadImgIcon' src="./fileUpload.svg" alt=""  />
                  </div>
                  <p className='uploadText'>Click to upload image</p>
                  <p className='uploadText'>SVG, PNG, JPG</p>
                </label>
              )}
            </div>
            {
              submitting ?
                <div>
                  <p>Loading</p>
                </div>
                :
                <div>
                  <button className='modalSellBtn'>Sell Item</button>
                </div>
            }

          </form>

        </div>
      </Modal>
    </div>
  )
}
