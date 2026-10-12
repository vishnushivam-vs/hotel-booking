
import { useNavigate } from 'react-router-dom'
import { useHotelData } from '../context/hotelData'
import { Navebar } from '../Navebar/Navebar'
import './Rooms.css'
export const Rooms = () => {

    const { hoteldata } = useHotelData()
    console.log("rooms", hoteldata);
    const navigate = useNavigate()

    return (
        <div>
            <Navebar />

            <div className='roomsSection'>
                {hoteldata.map((data) => (
                    <div className='roomsContainer' key={data.id}>
                        <div className='roomsImgbox'>
                            <img className="roomImg" src={data.hotelThumbanaile} alt="" />
                        </div>

                        <div className='roomsDtlsBox'>

                            <h3>{data.hotelName}</h3>
                            <h4>{data.hotelType}</h4>
                            <div className='roomsDescription'>
                                <p>{data.description}</p>
                            </div>

                            <h4>Room Price: {data.pricing.priceperNight}<label className='roomPrisetext'>for one night</label></h4>
                            <h4>rating: 4.5 ⭐</h4>
                            <p>place: {data.location.city}
                                <label>  {data.location.state}</label>
                                <label> {data.location.country}</label>
                            </p>
                        </div>

                        <button className='roomBkbtn'
                            onClick={() => {
                                navigate('/HotelDtlsPage', { state: data });
                                window.scrollTo(0, 0);
                            }}
                        >
                            Book Now
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}
