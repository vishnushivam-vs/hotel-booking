
import './HotelDetails.css'
export const BookingDtls = () => {
  return (
    <div>
        <div className="bookingDtlsContainer">
        <div className="fcltHeadBox">
            <h3>Facilities Provided</h3>
        </div>
        <div className="bookingDtlsCart">

            <div className="detailsCart">
                <div className="amenitiesBox">
                    <p>Kitchen</p>
                </div>
                <div className="amenitiesBox">
                    <p>Wifi</p>
                </div>
                <div className="amenitiesBox">
                    <p>Dedicated workspace</p>
                </div>
                <div className="amenitiesBox">
                    <p>Free parking on premises</p>
                </div>
                <div className="amenitiesBox">
                    <p>Kitchen</p>
                </div>
                <div className="amenitiesBox">
                    <p>Wifi</p>
                </div>
                <div className="amenitiesBox">
                    <p>Dedicated workspace</p>
                </div>
                <div className="amenitiesBox">
                    <p>Free parking on premises</p>
                </div>
            </div>
            <div className="bookingCart">
                <div className="priceBox">
                    <h3 className="bookingPrice"> ₹ 1,950</h3>
                    <p className="stayDays">for 2 nights</p>
                </div>
                <div className="reserveDtlsBox">
                    <div className="checkinDaysBox">
                        <div className="checkinBox">
                            <p className="chBoxtext">CHECK-IN</p>
                            <input type="date" className="checkin"  placeholder="Check in"/>
                        </div>
                        <div className="checkOutBox">
                            <p className="chBoxtext">CHECKOUT</p>
                            <input type="date" className="checkout"  placeholder="Check out"/>
                            
                        </div>
                    </div>
                    <div className="guestInputBox">
                        <div>
                           <label className="guestlabel" htmlFor="">GUESTS</label>
                           <p className="guestCount">1 guest</p>
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
                                <button className="minus">-</button>
                                <span className="countNumber" >1</span>
                                <button className="plus">+</button>
                            </div>

                        </div>
                        <div className="guestRow">
                            <div className="guestType">
                                <span>Children</span>
                            </div>
                           
                            <div className="counter">
                                <button className="minus">-</button>
                                <span className="countNumber"  >1</span>
                                <button className="plus">+</button>
                            </div>

                        </div>
                        <div className="guestRow">
                            <div className="guestType">
                                 <span>Infants</span>
                            </div>
                           
                            <div className="counter">
                                <button className="minus">-</button>
                                <span className="countNumber" >1</span>
                                <button className="plus">+</button>
                            </div>

                        </div>
                    </div>
                    <button className="ReserveBtn">Reserve</button>
                </div>
            </div>
        </div>

    </div>
    </div>
  )
}
