import { useState } from 'react';
import './HotelDetails.css'
import { useNavigate } from 'react-router-dom';
import { userAuth } from '../context/userauth';
import { useBookingAvailability } from "../context/BookingAvailabilityContext";

export const BookingDtls = ({ hotelData, facilities = [], pricing, description }) => {
    const { isHotelAvailable, loading: availabilityLoading } = useBookingAvailability();
    const [message, setMessage] = useState("");


    const { user } = userAuth()
    const navigate = useNavigate();
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("")
    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0,

    })

    const totalGuests = guests.adults + guests.children;
    const checkIndayName = new Date(checkin).toLocaleDateString("en-US", {
        weekday: "long"
    })
    const checkOutdayName = new Date(checkout).toLocaleDateString("en-US", {
        weekday: "long"
    })



    const today = new Date().toISOString().split("T")[0];

    const priceCalculation = (data) => {
        const price = Number(data?.priceperNight) || 0;
        const tax = Number(data?.tax) || 0;

        const discount = Number(data?.discount) || 0;

        const discountAmount = (price * discount) / 100;

        const totalAmount = price + tax - discountAmount;

        return totalAmount;
    }

    const getNextday = (date) => {
        if (!date) return today;

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0]
    }

    const totalStaydays = checkin && checkout ?
        Math.ceil(
            (new Date(checkout) - new Date(checkin)) /
            (1000 * 60 * 60 * 24)
        ) : 1;
    
    const totalAmount = priceCalculation(pricing) * totalStaydays;

    const showUnavailableMessage = () => {
        setMessage("Hotel room is not available for this date.");

        setTimeout(() => {
            setMessage("");
        }, 5000);
    };
    return (
        <div>
            <div className="bookingDtlsContainer">

                <div className='descriptionDtlsbox'>
                    <h3>About This Hotel :</h3>
                    <h4>
                        {description}
                    </h4>
                </div>
                <div className="fcltHeadBox">
                    <h3>Facilities Provided</h3>
                </div>
                <div className="bookingDtlsCart">

                    <div className="detailsCart">
                        {facilities.map((fecilities, index) => (
                            <div className="amenitiesBox" key={index}>
                                <p>{fecilities}</p>
                            </div>
                        ))}

                    </div>
                    <div className="bookingCart">
                        <div className="priceBox">
                            <h3 className="bookingPrice">  ₹ {totalAmount} </h3>
                            <p className="stayDays">for {totalStaydays}
                                {totalStaydays === 1 ? " night" : " nights"}
                            </p>
                        </div>
                        <div className="reserveDtlsBox">
                            <div className="checkinDaysBox">
                                <div className="checkinBox">
                                    <p className="chBoxtext">CHECK-IN</p>
                                    <input type="date" className="checkin" placeholder="Check in"
                                        min={today}
                                        value={checkin}
                                        onChange={(e) => setCheckin(e.target.value)}
                                    />
                                    <span className='dayname'>{checkin ? checkIndayName : ""}</span>
                                </div>
                                <div className="checkOutBox">
                                    <p className="chBoxtext">CHECKOUT</p>
                                    <input type="date" className="checkout" placeholder="Check out"
                                        min={getNextday(checkin)}
                                        value={checkout}
                                        onChange={(e) => setCheckout(e.target.value)}
                                        disabled={!checkin}
                                    />
                                    <span className='dayname'>{checkout ? checkOutdayName : ""}</span>
                                </div>
                            </div>
                            <div className="guestInputBox">
                                <div>
                                    <label className="guestlabel" htmlFor="">GUESTS</label>
                                    <p className="guestCount">{totalGuests} guest</p>
                                </div>
                                <div>
                                    <button className="downArrow">
                                        <img className="chevronarrow" src="https://img.icons8.com/?size=100&id=40021&format=png&color=000000" alt="" />
                                    </button>
                                </div>

                            </div>
                            <div className="guestDropdown">
                                <div className="guestRow">
                                    <div className="guestType">
                                        <span>Adults</span>
                                    </div>

                                    <div className="counter">
                                        <button className="minus"
                                            onClick={() => setGuests({
                                                ...guests,
                                                adults: Math.max(1, guests.adults - 1)
                                            })}
                                        >-</button>
                                        <span className="countNumber" >{guests.adults}</span>
                                        <button className="plus"
                                            onClick={() => setGuests({
                                                ...guests,
                                                adults: Math.min(2, guests.adults + 1)
                                            })}
                                        >+</button>
                                    </div>

                                </div>
                                <div className="guestRow">
                                    <div className="guestType">
                                        <span>Children</span>
                                    </div>

                                    <div className="counter">
                                        <button className="minus"
                                            onClick={() => setGuests({
                                                ...guests,
                                                children: Math.max(0, guests.children - 1)
                                            })}
                                        >-</button>
                                        <span className="countNumber"  >{guests.children}</span>
                                        <button className="plus"
                                            onClick={() => setGuests({
                                                ...guests,
                                                children: Math.min(2, guests.children + 1)
                                            })}
                                        >+</button>
                                    </div>

                                </div>
                                <div className="guestRow">
                                    <div className="guestType">
                                        <span>Infants</span>
                                    </div>

                                    <div className="counter">
                                        <button className="minus"
                                            onClick={() => setGuests({
                                                ...guests,
                                                infants: Math.max(0, guests.infants - 1)
                                            })}
                                        >-</button>
                                        <span className="countNumber" >{guests.infants}</span>
                                        <button className="plus"
                                            onClick={() => setGuests({
                                                ...guests,
                                                infants: Math.min(4, guests.infants + 1)
                                            })}
                                        >+</button>
                                    </div>

                                </div>
                            </div>

                              {message && (
                                <p style={{ 
                                color: "red", 
                                marginTop: "10px", 
                                marginLeft: "40px"
                                }}>
                                    {message}
                                </p>
                            )}
                            <button className="ReserveBtn"
                                onClick={() => {

                                    showUnavailableMessage()

                                    if (!user) {
                                        alert("please login confirm your bookings")
                                        return;
                                    }
                                    if (!checkin || !checkout) {
                                        alert("Please select check-in and check-out dates")
                                        return;
                                    }

                                    if (availabilityLoading) {
                                        alert("Checking hotel availability...");
                                        return;
                                    }

                                    const available = isHotelAvailable(
                                        hotelData.id,
                                        checkin,
                                        checkout
                                    );

                                    console.log("Hotel ID:", hotelData.id);
                                    console.log("Selected check-in:", checkin);
                                    console.log("Selected check-out:", checkout);
                                    console.log("Hotel available:", available);

                                    if (!available) {
                                        alert(
                                            "Hotel is not available for the selected dates."
                                        );
                                        return;
                                    }
                                    navigate("/Bookingpage", {
                                        state: {
                                            hotelData,
                                            checkin,
                                            checkout,
                                            guests,
                                            totalGuests,
                                            totalStaydays,
                                            totalAmount,
                                            checkIndayName,
                                            checkOutdayName
                                        }
                                    })
                                }}
                            >Book Now</button>

                          
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
