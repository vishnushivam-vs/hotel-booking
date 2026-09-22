import { useLocation } from "react-router-dom";
import { Navebar } from "../Navebar/Navebar"
import './Bookingpage.css'

export const Bookingpage = () => {

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
                                        <div className="checkinBox">
                                            <p>12/3/2026</p>
                                        </div>
                                    </div>
                                    <div className="checkoutclm">
                                        <p>Check Out:</p>
                                        <div className="checkOutBox">
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
                          <div className="extraInfrmBox">hello

                          </div>
                    </div>

                    <div className="paymentBox">

                    </div>
                </div>
                
            </div>
        </div>
    )
}
