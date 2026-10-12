import { useNavigate } from 'react-router-dom';
import { useHotelData } from '../context/hotelData';
import './Cart.css';

export const Cart = () => {
    const { hoteldata } = useHotelData();
    const priceCalculation = (data) => {

        const price = Number(data.pricing?.priceperNight) || 0;
        const tax = Number(data.pricing?.tax) || 0;
        const discount = Number(data.pricing?.discount) || 0;
        const discountAmount = (price * discount) / 100;
        const totalAmount = price + tax + discountAmount;
        return totalAmount;

    }


    const navigate = useNavigate()
    const randomHotels = [...(hoteldata || [])]
        .sort(() => Math.random() - 0.5)
        .slice(0, 9);

    return (
        <div className='hotelsDtlsContainer'>
            {
                randomHotels.map((data) => (
                    <div className="hotelDtlsCart" key={data.id}
                        onClick={() => {
                            navigate('/HotelDtlsPage', { state: data });
                            window.scrollTo(0, 0);
                        }}
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
                                    {data.description.slice(0, 80)}...
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
                                <p className="price"> ₹ <span className='priceamount'>
                                    {priceCalculation(data)}
                                </span> for  1 night</p>
                                <button className="bookingBtn">Book Now</button>
                            </div>

                        </div>

                    </div>
                ))
            }
        </div>
    )
}
