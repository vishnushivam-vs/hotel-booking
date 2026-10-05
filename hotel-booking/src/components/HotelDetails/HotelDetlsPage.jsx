import { useLocation } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Navebar } from '../Navebar/Navebar'
import { BookingDtls } from './BookingDtls'
import { userAuth } from '../context/userauth'
import './sample.css'

export const HotelDtlsPage = () => {
    const { loading} = userAuth()
    const location = useLocation();
    const hotelData = location.state;

    console.log("dtls data", hotelData);
    if(loading){
        
        return
    }
    return (
        <>
            <div>
                <Navebar />
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
                                src={hotelData.hotelThumbanaile}
                                alt="" />
                        </div>
                        <div className="sideImg">
                            {hotelData.images.map((image, index) => (
                                <div className="coloumn2" key={index}><img className="hotelImg"
                                    src={image}
                                    alt="" />
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="htlNameBox">
                        <h3 className="hotelName">{`${hotelData.hotelName} - ${hotelData.location.city}`}</h3>
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
                <BookingDtls 
                hotelData={hotelData}
                facilities={hotelData.facilities} 
                pricing={hotelData.pricing} 
                description={hotelData.description} 
                
                />
                <Footer />
            </div>
        </>
    )
}
