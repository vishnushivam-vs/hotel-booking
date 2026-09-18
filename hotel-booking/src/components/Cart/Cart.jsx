
import './Cart.css'
export const Cart = () => {
    return (
        <div>
            <div className="hotelDtlsCart">
                {
                    
                }
                <div className="imageBox">

                    <img className="hotelimage" src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg" alt="" set="" />
                </div>
                <div className="cartDtls">
                    <div className="htlNameBox">
                        <p className="htlName">Hotel Name</p>
                    </div>

                    <p className="cityName">City</p>
                    <div className="htlDtls">
                        <p className="description">
                            Experience luxury and comfort in the heart of the city
                            Cozy rooms, stunning views, and top-className service await you
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

        </div>
    )
}
