import { useNavigate } from "react-router-dom"
import { useHotelData } from "../context/hotelData"


export const HotelsCart = () => {

  const { hoteldata } = useHotelData()
  const navigate =useNavigate()
  return (
    <div className="hotelsCartdataContainer">
      {
        hoteldata.map((data) => (
          <div className="dtlsCartscetion" key={data.id}
           onClick={() => navigate('/HotelDtlsPage', { state: data })}
          >
            <div className="htlroomiamgeBox">
              <img className="htlimg" src={data.hotelThumbanaile} alt="" />
            </div>
            <div className="bottomSection">
              <div className="htlNamebox">
                <h4>{data.hotelName}</h4>

              </div>
              <div className="htlCartbottomBox">
                <h4>price : <label className="htlPrice">  ₹ {data.pricing.priceperNight}</label></h4>
                <p>city: {data.location.city}</p>
              </div>
            </div>
            <button className="bookingBtnCart">Book Now</button>
          </div>
        ))
      }

    </div>
  )
}
