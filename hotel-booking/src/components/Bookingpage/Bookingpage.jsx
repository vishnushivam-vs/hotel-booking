import { useLocation } from "react-router-dom";
import { Navebar } from "../Navebar/Navebar"
import './Bookingpage.css'

export const Bookingpage = ({ totalDays }) => {

    const location = useLocation();
    const bkingData = location.state
    console.log("bkingData", bkingData);

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
                                <img className="img" src={bkingData.hotelThumbanaile} alt="" />
                            </div>
                            <div className="htlBkgDtlsBottemsection">
                                <h2>{bkingData.hotelName}</h2>
                                <div className="bokkingdateBox">
                                    <div className="checkInclm">
                                        <p>Check in:</p>
                                        <div className="bkcheckinBox">
                                            <p>12/3/2026</p>
                                        </div>
                                    </div>
                                    <div className="checkoutclm">
                                        <p>Check Out:</p>
                                        <div className="bkcheckOutBox">
                                            <p>12/3/2026</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="gusteDtlbox">
                                    <p>Adults:</p>
                                    <p>Childrens:</p>
                                    <div className="TotalGusts">
                                        <p>3 gustes</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="bkBottomContainer">
                            <div className="bkRoomtypeBox">
                                <h4>Room type: <label className="labelbk">King bed</label></h4>
                                <h4>Bead type: <label className="labelbk">King bed</label></h4>
                            </div>
                            <div className="bkbootomClm">
                                <h4>Address:</h4>
                                <p> {bkingData.location.city}, {bkingData.location.state}, {bkingData.location.country}</p>
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
                                <span>₹ {bkingData.pricing.priceperNight}</span>
                            </div>
                            <div className="priceRow">
                                <span>{bkingData.pricing.priceperNight} * {totalDays} days</span>
                                <span>₹ {}</span>
                            </div>
                            <div className="priceRow">
                                <span>Tax</span>
                                <span>₹ {bkingData.pricing.tax}</span>
                            </div>
                            <div className="priceRow discountRow">
                                <span>Discount</span>
                                <span>- ₹ {bkingData.pricing.discount}</span>
                            </div>
                            <div className="totalRow">
                                <strong>Total</strong>
                                <strong>₹ {}</strong>
                            </div>
                        </div>
                        <button className="bkbookBtn">
                            Confirm Booking
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
