import { useLocation, useNavigate } from "react-router-dom";
import { Navebar } from "../Navebar/Navebar"
import './Bookingpage.css'
import { firestore } from "../Firebase/Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { userAuth } from "../context/userauth";

export const Bookingpage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading } = userAuth();
    console.log(user);

    const {
        hotelData,
        checkin,
        checkout,
        guests,
        totalGuests,
        totalStaydays,
        totalAmount,
        checkIndayName,
        checkOutdayName
    } = location.state || {};

    const finalroomPrice = Number(hotelData.pricing.priceperNight * totalStaydays)
    const handleBooking = async () => {
        try {



            const bookingData = {
                userId: user.uid,
                userName: user.displayName || "",
                userEmail: user.email,

                hotelId: hotelData.id,
                hotelName: hotelData.hotelName,
                hotelImage: hotelData.hotelThumbanaile,
                guests: guests,
                totalGuests: totalGuests,

                totalStaydays: totalStaydays,
                checkInday: checkin,
                checkOutday: checkout,
                totalAmount: totalAmount,

                checkIndayName: checkIndayName,
                checkOutdayName: checkOutdayName,

                bookingStatus: "Confirmed",
                paymentStatus: "Paid",

                createdAt: serverTimestamp()
            }

            const docRef = await addDoc(
                collection(firestore, "Bookings"),
                bookingData

            );


            console.log("Hotel availability added");

            alert("Booking confirmed successfully!");

            navigate("/Mybooking");
        } catch (error) {
            console.log("booking error", error);
            alert("Booking failed");
        }
    }

    const newData = async () => {
        try {
            const availabilityData = {
                hotelId: hotelData.id,
                checkin: checkin,
                checkout: checkout,
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(
                collection(firestore, "HotelAvailability"),
                availabilityData
            );

            console.log("Availability created:", docRef.id);

        } catch (error) {
            console.log("Availability error:", error);
        }
    };

    return (
        <div>
            <Navebar />
            <div className="bookingContainer">
                <div className="topContSection">
                    <h3>My Bookings </h3>
                    <p>Book your dream stay , plan trip</p>
                </div>
                <div className="gridContainer">
                    <div className="htlDtlsBox">
                        <div className="htlDtlsfirstClm">
                            <div className="imageBox">
                                <img className="img" src={hotelData.hotelThumbanaile} alt="" />
                            </div>
                            <div className="htlBkgDtlsBottemsection">
                                <h2>{hotelData.hotelName}</h2>
                                <div className="bokkingdateBox">
                                    <div className="checkInclm">
                                        <p>Check in:</p>
                                        <div className="bkcheckinBox">
                                            <p>{checkin}</p>
                                        </div>

                                    </div>
                                    <div className="checkoutclm">
                                        <p>Check Out:</p>
                                        <div className="bkcheckOutBox">
                                            <p>{checkout}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="dayBox">
                                    <span className="dayname">{checkIndayName}</span>
                                    <span className="dayname">{checkOutdayName}</span>
                                </div>
                                <h4 className="daynotag">Total Satay: {totalStaydays} Days</h4>
                                <div className="gusteDtlbox">
                                    <p>Adults: {guests.adults}</p>
                                    <p>Childrens: {guests.children}</p>
                                    <div className="TotalGusts">
                                        <p>{totalGuests} gustes</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="bkBottomContainer">
                            <div className="bkRoomtypeBox">
                                <h4>Room type: <label className="labelbk">{hotelData.roomDetails.roomType}</label></h4>
                                <h4>Bead type: <label className="labelbk">{hotelData.roomDetails.bedType}</label></h4>
                            </div>
                            <div className="bkbootomClm">
                                <h4>Address:</h4>
                                <p> {hotelData.location.city}, {hotelData.location.state}, {hotelData.location.country}</p>
                            </div>
                            <div className="bkbootomrgtClm">
                                <h4>Contact Information</h4>
                                <p>Hotel Reception</p>
                                <p>+91 98765 43210</p>
                                <p>reception@hotel.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="paymentBox">
                        <h3 className="headSummery">Checkout summary</h3>
                        <div className="priceContainer">
                            <div className="priceRow">
                                <span>Room price</span>
                                <span>₹ {hotelData.pricing.priceperNight}</span>
                            </div>
                            <div className="priceRow">
                                <span>{hotelData.pricing.priceperNight} * {totalStaydays} days</span>
                                <span>₹ {finalroomPrice}</span>
                            </div>
                            <div className="priceRow">
                                <span>Tax</span>
                                <span>₹ {Number(hotelData.pricing.tax * totalStaydays)}</span>
                            </div>
                            <div className="priceRow discountRow">
                                <span>Discount</span>
                                <span>- ₹ {Number((finalroomPrice * hotelData.pricing.discount) / 100)}</span>
                            </div>
                            <div className="totalRow">
                                <strong>Total</strong>
                                <h3>₹ {totalAmount}</h3>
                            </div>
                        </div>
                        <button className="bkbookBtn"
                            onClick={async () => {
                                await handleBooking();
                                await newData();
                            }}
  
                           
                        >
                        Confirm Booking
                    </button>
                </div>
            </div>

        </div>
        </div >
    )
}
