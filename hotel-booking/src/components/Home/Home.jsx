import { useState } from "react";
import { Navebar } from "../Navebar/Navebar";
import { Cart } from "../Cart/Cart";
import "./Home.css";
import { Footer } from "../Footer/Footer";
import { HotelsCart } from "../Hotelscarts/HotelsCart";
import { useBookingAvailability } from "../context/BookingAvailabilityContext";
import { HotelsCart1 } from "../Hotelscarts/Searchhotel";
import { Destination } from "./Destination/Destination";

export const Home = () => {

  const [search, setSearch] = useState("India tourist destinations");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [serachResultShow, SetserachResultShow] = useState(false)
  const [searchHotels, setSearchHotels] = useState(null);
  const today = new Date().toISOString().split("T")[0];

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

        return (
          checkin < existingCheckout &&
          checkout > existingCheckin
        );

      })
      .map((booking) => booking.hotelId);

    setSearchHotels({
      checkin,
      checkout,
      bookedHotelIds,
      search
    });


  };

  const getNextday = (date) => {

    if (!date) return today;
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0]
  }


  return (
    <div>

      <Navebar
        
      />

      <div className="topContainer">
        <div className="headLineBox">
          <h1 className="headLine">Book Your Ideal Stay with Ease and Confidence</h1>
        </div>
        <div className="inputBox">
          <div className="input"

          >
            <label className='textlabel' htmlFor="Where">Where</label>
            <input
              type="text"
              className="destiantionbox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Munnar, Paris, Taj Mahal..."
            />

          </div>
          <div className="input">

            <label className="textlabel" htmlFor="checkin">
              Check in
            </label>

            <input
              type="date"
              className="checkin"
              min={today}
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
              min={getNextday(checkin)}
              className="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />

          </div>
          <button className="searchBtn"
            onClick={() => {
              if (!checkin || !checkout) {
                alert("Select the check-in and check-out dates");
                return;
              }
              handleSearch();

              SetserachResultShow(true)
            }}
            disabled={availabilityLoading}

          >
            {availabilityLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>



      {
        !serachResultShow ?
          <>
            <h3>Top Picks for Your Stay</h3>
            <Cart />
            <h2>Find Your Ideal Stay</h2>
            <HotelsCart />
            <Destination
              searchQuery={search}
            />

          </>
          :
          <>
            <h2>Available Hotels</h2>
            <HotelsCart1 searchData={searchHotels} />
            <Destination
              searchQuery={searchHotels.search}
            />
          </>
      }

      <Footer />
    </div>

  )
}
