import { useNavigate } from 'react-router-dom';
import { useHotelData } from '../context/hotelData'
import './Cart.css'
export const Cart = () => {
    const { hoteldata } = useHotelData();
    console.log(hoteldata);
    const navigate = useNavigate()
    return (
        <div className='hotelsDtlsContainer'>
            {
                
                hoteldata.map((data) => (
                    <div className="hotelDtlsCart" key={data.id}
                    onClick={() => navigate('/HotelDtlsPage')}
                    >

                        <div className="imageBox">

                            <img className="hotelimage" src={data.hotelThumbanaile} alt="" set="" />
                        </div>
                        <div className="cartDtls">
                            <div className="htlNameBox">
                                <h4 className="htlName">{data.hotelName}</h4>
                            </div>

                            <p className="cityName">City: {data.location.city}</p>
                            <div className="htlDtls">
                                <p className="description">
                                    {data.description}
                                </p>
                            </div>

                            <p className="rating">
                                Rating:
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </p>
                            <div className="crtDwnBox">
                                <p className="price">$ 67.00</p>
                                <button className="bookingBtn">Book Now</button>
                            </div>

                        </div>

                    </div>
                ))
            }


        </div>
    )
}
