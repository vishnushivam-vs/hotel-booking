import { Navebar } from '../Navebar/Navebar'
import { Cart } from '../Cart/Cart'
import './Home.css'
import { Footer } from '../Footer/Footer'
import { DestinationCart } from './DestinationCart'
//import { HotelDtlsPage } from '../HotelDetails/HotelDetlsPage'
import {useNavigate} from 'react-router-dom'

import { fetchFromFirestore } from '../Firebase/Firebase'
import { useEffect } from 'react'

export const Home = () => {

  const navigate = useNavigate()
  
  useEffect(()  => {
    const getHotel = async () =>{
      const data = await fetchFromFirestore();
      console.log("data",data);
      
    }
    getHotel()
  },[])

  return (
    <div>
      <Navebar/>
      <button onClick={() => navigate('/HotelDtlsPage')}>dtlspage</button>
      <div className="topContainer">
        <div className="headLineBox">
          <h1 className="headLine">Book Your Ideal Stay with Ease and Confidence</h1>
        </div>
        <div className="inputBox">
          <div className="input">
            <label className='textlabel' htmlFor="Where">Where</label>
            <input type="text" className="searchInput" placeholder='searchdestination' />

          </div>
          <div  className="input">
            <label className="textlabel" htmlFor="checkin">Check in</label>
            <input type="date" className="checkin" placeholder="Check in" />
          </div>
          <div className="input">
            <label className="textlabel" htmlFor="checkout">Check out</label>
            <input type="date" className="checkout"  />
          </div>
          <button className="searchBtn">Search</button>
        </div>
      </div>
      <div className="hotelsDtlsContainer">
        <Cart />
      </div>
      <DestinationCart/>
      
      <Footer/>
    </div>
  )
}
// <label className="textlabel" for="checkin">Check in</label>
// <label className="textlabel" for="checkout">Check out</label>