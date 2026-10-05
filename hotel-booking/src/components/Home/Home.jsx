import { useState } from "react";
import { Navebar } from "../Navebar/Navebar";
import { Cart } from "../Cart/Cart";
import "./Home.css";
import { Footer } from "../Footer/Footer";
import { DestinationCart } from "./DestinationCart";
import { HotelsCart } from "../Hotelscarts/HotelsCart";
import { useBookingAvailability } from "../context/BookingAvailabilityContext";
import { HotelsCart1 } from "../Hotelscarts/Searchhotel";

export const Home = () => {
  
       const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const [searchHotels, setSearchHotels] = useState(null);

  const {
    availability,
    loading: availabilityLoading
  } = useBookingAvailability();
    

  const handleSearch = () => {

    if (!checkin || !checkout) {
      alert("Please select Check in and Check out dates");
      return;
    }

    if (checkin >= checkout) {
      alert("Checkout date must be after Checkin date");
      return;
    }
   const bookedHotelIds = availability
      .filter((booking) => {

        const existingCheckin = booking.checkin;
        const existingCheckout = booking.checkout;

        // Same hotel + date overlap
        return (
          checkin < existingCheckout &&
          checkout > existingCheckin
        );

      })
      .map((booking) => booking.hotelId);


    console.log("Booked hotel IDs:", bookedHotelIds);
    setSearchHotels({
      checkin,
      checkout,
      bookedHotelIds
    });
  };


  return (
    <div>
      <Navebar/>
      
      <div className="topContainer">
        <div className="headLineBox">
          <h1 className="headLine">Book Your Ideal Stay with Ease and Confidence</h1>
        </div>
        <div className="inputBox">
          <div className="input">
            <label className='textlabel' htmlFor="Where">Where</label>
            <input
              type="text"
              className="searchInput"
              placeholder="search destination"
            />

          </div>
           <div className="input">

            <label className="textlabel" htmlFor="checkin">
              Check in
            </label>

            <input
              type="date"
              className="checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />

          </div>
          <div className="input">

            <label className="textlabel" htmlFor="checkout">
              Check out
            </label>

            <input
              type="date"
              className="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />

          </div>
          <button className="searchBtn"
            onClick={handleSearch}
            disabled={availabilityLoading}
          >     
         {availabilityLoading ? "Loading..." : "Search"}
         </button>
        </div>
      </div>
      <h3>Top Picks for Your Stay</h3>
        <Cart />

        <h2>Find Your Ideal Stay</h2>
        <HotelsCart  />
        <HotelsCart1 searchData={searchHotels}/>
      <DestinationCart/>
      
      <Footer/>
    </div>
  )
}
