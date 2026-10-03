
import './Myhotels.css'
import { Navebar } from '../Navebar/Navebar'
import { auth, firestore } from '../Firebase/Firebase'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { data } from 'react-router-dom'
export const Myhotels = () => {
    const user = auth.currentUser;
    const [myHotels, setMyHotels] = useState([])
    const navigate = useNavigate()
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

    const handleCancelProperty = async (hotelId) => {
        try {
            await deleteDoc(
                doc(firestore, "Hoteldetails", hotelId)
            );

            // Remove deleted booking from React state
            setMyHotels((hotel) =>
                hotel.filter(
                    (hotel) => hotel.id !== hotelId
                )
            );


            console.log("Booking cancelled successfully");

        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };
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
                                <button className='editBtn'
                                    onClick={() => navigate("/EdithotelData", {
                                         state:{ hotel }      
                                    })}
                                >Edit</button>
                                <button className='cancelBtn'
                                    onClick={() => handleCancelProperty(hotel.id)}
                                >Cancell</button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
