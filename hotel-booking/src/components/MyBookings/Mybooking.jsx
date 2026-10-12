
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import './Mybooking.css'
import { useEffect, useState } from 'react';
import { Navebar } from '../Navebar/Navebar';
import { userAuth } from '../context/userauth';

export const Mybooking = () => {

    const { user, loading } = userAuth()
    const [myBookings, setMybookings] = useState([])
    const today = new Date().toISOString().split("T")[0];
    useEffect(() => {

        if (loading) return;
        if (!user?.uid) return;

        const getBookings = async () => {

            try {

                const q = query(
                    collection(firestore, "Bookings"),
                    where("userId", "==", user.uid)
                );

                const snapshot = await getDocs(q);
                const bookings = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setMybookings(bookings);

            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };


        getBookings();

    }, [user, loading]);

    const activeBookings = myBookings.filter((booking) => {
        return booking.checkOutday >= today;
    });
    const previousBookings = myBookings.filter((booking) => {
        return booking.checkOutday < today;
    })
    const handleCancelBooking = async (bookingId) => {
        try {
            await deleteDoc(
                doc(firestore, "Bookings", bookingId)
            );

            setMybookings((prevBookings) =>
                prevBookings.filter(
                    (booking) => booking.id !== bookingId
                )
            );


        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };
    return (
        <div>
            <Navebar />
            <div className='MyBookingSection'>
                <h2>My Bookings</h2>
                <div className='activebookingsection'>
                    <h3>Active Bookings</h3>
                    {activeBookings.length === 0 ? (
                        <p>No active bookings</p>
                    ) : (
                        activeBookings.map((data) => (
                            <div className='myBookinggrid' key={data.id}>
                                <div className='gridClm1'>
                                    <div className='hotelImgClm'>
                                        <img className='mybkHtlimg' src={data.hotelImage} alt="" />
                                    </div>
                                    <div className='htlDtlsClm'>
                                        <h4>{data.hotelName}</h4>
                                        <p>Location<label>mumbai india</label></p>
                                        <p>Guests<label>{data.totalGuests}</label></p>
                                        <p>Total: <label>{data.totalAmount}</label></p>
                                    </div>
                                </div>
                                <div className='gridClm2'>

                                    <div className='checkdateclm'>
                                        <div className='checkinClmA'>
                                            <h4>Check-In: <label>{data.checkInday}</label></h4>
                                            <p>{data.checkIndayName}</p>
                                        </div>
                                        <div className='checkinClmA'>
                                            <h4>Check-Out: <label>{data.checkOutday}</label></h4>
                                            <p>{data.checkOutdayName}</p>
                                        </div>
                                    </div>
                                    <div className='paymentClm'>
                                        <p>payment:</p>
                                        <p>{data.paymentStatus}</p>
                                    </div>
                                    <p>Booking Status : <span className="completed"> Confirmed</span></p>

                                    <h5>Stay Dates: <label> {data.totalStaydays} Nights</label ></h5>
                                </div>
                                {
                                    today !== data.checkOutday ?
                                        <button className='cansellBtn'
                                            onClick={() => handleCancelBooking(data.id)}
                                        >Cancel Booking</button> : ""
                                }

                            </div>
                        ))
                    )

                    }

                </div>
                <h3>Previous Bookings</h3>
                {
                    previousBookings.length === 0 ? (
                        <p>No Previous bookings</p>
                    ) : (
                        previousBookings.map((data) => (
                            <div className='myBookinggrid' key={data.id}>
                                <div className='gridClm1'>
                                    <div className='hotelImgClm'>
                                        <img className='mybkHtlimg' src={data.hotelImage} alt="" />
                                    </div>
                                    <div className='htlDtlsClm'>
                                        <h4>{data.hotelName}</h4>
                                        <p>Location<label>mumbai india</label></p>
                                        <p>Guests<label>{data.totalGuests}</label></p>
                                        <p>Total: <label>{data.totalAmount}</label></p>
                                    </div>
                                </div>
                                <div className='gridClm2'>
                                    <div className='prevcheckdateclm'>
                                        <div className="checkinClm">
                                            <h4>Stay Dates</h4>
                                            <label>{data.checkInday} – {data.checkOutday}</label>
                                            <p>{data.totalStaydays} Nights</p>
                                        </div>

                                        <div className="bookingInfo">

                                            <p>Booking Status: <span className="completed">Completed</span></p>
                                            <p>Stay: <span className="past">Stay Ended</span></p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))
                    )}

            </div>
        </div>
    )
}
