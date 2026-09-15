import { Footer } from '../Footer/Footer'
import { Navebar } from '../Navebar/Navebar'
import { BookingDtls } from './BookingDtls'

export const HotelDtlsPage = () => {
    return (
        <>
            <div>
                <Navebar/>
                <div className="headBox">
                    <div className="gridBox">
                        <h2>The Canopy Nook 1BHK couple friendly near HSR</h2>
                    </div>
                    <div className="gridBox">

                    </div>

                </div>

                <div className="hotelIMGcontainer">
                    <div className="propertyCart">
                        <div className="coloumn1">
                            <img className="hotelImg"
                                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
                                alt="" />
                        </div>
                        <div className="sideImg">
                            <div className="coloumn2"><img className="hotelImg"
                                src="https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsfGVufDB8fDB8fHww"
                                alt="" /></div>
                            <div className="coloumn2"><img className="hotelImg"
                                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
                                alt="" /></div>
                            <div className="coloumn2"><img className="hotelImg"
                                src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHww"
                                alt="" /></div>
                            <div className="coloumn2"><img className="hotelImg"
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsfGVufDB8fDB8fHww"
                                alt="" /></div>
                        </div>
                    </div>
                    <div className="htlNameBox">
                        <h3 className="hotelName">Entire cottage in Idukki, India</h3>
                    </div>
                    <div className="revieContainer">
                        <div className="reviewBox">
                            <div className="box">
                                <h4>Guest favourite</h4>
                            </div>
                            <div className="box">
                                <p> ⭐ 4.67</p>
                            </div>
                            <div className="box">
                                <p>62 reviews</p>
                            </div>

                        </div>
                        <div></div>
                    </div>


                </div>
                <BookingDtls />
                <Footer/>
            </div>
        </>
    )
}
