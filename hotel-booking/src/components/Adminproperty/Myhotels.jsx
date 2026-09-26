import React, { useEffect, useState } from 'react'
import './Myhotels.css'
import { Navebar } from '../Navebar/Navebar'
import { auth, firestore } from '../Firebase/Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
//import { data } from 'react-router-dom'
export const Myhotels = () => {
    const user = auth.currentUser;
    const [myHotels, setMyHotels] = useState([])

    useEffect(() => {
        const getMyhotels = async () => {
            try {
                if (!user) {
                    alert("please log")
                    return;
                }

                const q = query(
                    collection(firestore, "Hoteldetails"),
                    where("adminId", "==", user.uid)
                )
                const querySnapshot = await getDocs(q);

                const hotels = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setMyHotels(hotels)
                 console.log("My Properties:", hotels);

            } catch (error) {
                console.log("myHotels error;", error);

            }
        };
        getMyhotels()
    }, []);
    return (
        <div>
            <Navebar />
            <div className='myHotelssection'>

                <h2 className="myHotelsTitle">My Hotels</h2>
                {
                    myHotels.map((hotel) => (
                       <div className='myHtlsContainer' key={hotel.id}>
                    <div className='htlIImgbox'>
                        <img src={hotel.hotelThumbanaile} alt="" />
                    </div>
                    <div className='hotlDtlsbox'>
                        <h2>{hotel.hotelName}</h2>
                        <h3>palce: <label>{hotel.location.city} {hotel.location.state} {hotel.location.country}</label></h3>
                        <p>{hotel.hotelType}</p>
                        <h3>₹ {hotel.pricing.priceperNight} <label>for one night</label></h3>
                       <p>discount: <label>{hotel.pricing.discount}%</label></p> 
                       <p>Tax: <label>{hotel.pricing.tax}</label></p> 
                    </div>
                    <div className='hotelActions'>
                        <button className='editBtn'>Edit</button>
                        <button className='cancelBtn'>Cancell</button>
                    </div>
                </div>
                    ))
                }
                
            </div>
        </div>
    )
}
