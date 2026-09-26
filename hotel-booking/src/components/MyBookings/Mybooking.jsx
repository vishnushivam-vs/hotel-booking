import React from 'react'
import './Mybooking.css'
export const Mybooking = () => {
    return (
        <div>
            <div className='MyBookingSection'>
                <h2>My Bookings</h2>
                <div className='activebookingsection'>
                    <h3>Active Bookings</h3>
                    <div className='myBookinggrid'>
                        <div className='gridClm1'>
                            <div className='hotelImgClm'>
                                <img className='mybkHtlimg' src="premiu.png" alt="" />
                            </div>
                            <div className='htlDtlsClm'>
                                <h4>hotel name</h4>
                                <p>Location<label>mumbai india</label></p>
                                <p>Guests<label>3</label></p>
                                <p>Total: <label>3000</label></p>
                            </div>
                        </div>
                        <div className='gridClm2'>
                            <div className='checkdateclm'>
                                <div className='checkinClmA'>
                                    <h4>Check-In: <label>23/5/26</label></h4>
                                    <p>tusday</p>
                                </div>
                                <div className='checkinClmA'>
                                    <h4>Check-Out: <label>23/5/26</label></h4>
                                    <p>friday</p>
                                </div>
                            </div>
                            <div className='paymentClm'>
                                <p>payment:</p>
                                <p>Paid</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Previous Bookings</h3>
                <div className='myBookinggrid'>
                    <div className='gridClm1'>
                        <div className='hotelImgClm'>
                            <img className='mybkHtlimg' src="premiu.png" alt="" />
                        </div>
                        <div className='htlDtlsClm'>
                            <h4>hotel name</h4>
                            <p>Location<label>mumbai india</label></p>
                            <p>Guests<label>3</label></p>
                            <p>Total: <label>3000</label></p>
                        </div>
                    </div>
                    <div className='gridClm2'>
                        <div className='prevcheckdateclm'>
                            <div className="checkinClm">
                                <h4>Stay Dates</h4>
                                <label>23 May 2026 – 26 May 2026</label>
                                <p>3 Nights</p>
                            </div>

                            <div className="bookingInfo">
                              
                                <p>Booking Status: <span className="completed">Completed</span></p>
                                <p>Stay: <span className="past">Stay Ended</span></p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
