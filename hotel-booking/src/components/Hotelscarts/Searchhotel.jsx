import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { useBookingAvailability } from "../context/BookingAvailabilityContext";
import "./Search.css"
export const HotelsCart1 = ({ searchData }) => {

  const [hotels, setHotels] = useState([]);

  const {
    availability,
    loading: availabilityLoading
  } = useBookingAvailability();


  useEffect(() => {

    const fetchHotels = async () => {

      try {

        const snapshot = await getDocs(
          collection(firestore, "Hoteldetails")
        );

        const hotelData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setHotels(hotelData);

      } catch (error) {

        console.log("Hotel fetch error:", error);

      }

    };

    fetchHotels();

  }, []);


  // --------------------------------
  // Search button click cheythal
  // --------------------------------

  let filteredHotels = hotels;


  if (searchData) {

    const {
      checkin,
      checkout
    } = searchData;


    filteredHotels = hotels.filter((hotel) => {

      // Ee hotel-inte bookings
      const hotelBookings = availability.filter(
        (booking) =>
          booking.hotelId === hotel.id
      );


      // Existing booking date overlap undo?
      const conflict = hotelBookings.some(
        (booking) => {

          const existingCheckin = booking.checkin;
          const existingCheckout = booking.checkout;


          return (
            checkin < existingCheckout &&
            checkout > existingCheckin
          );

        }
      );


      // Conflict illa → hotel available
      return !conflict;

    });
    console.log("Available Hotels:", filteredHotels);

  }


  if (availabilityLoading) {
    return <p>Checking hotel availability...</p>;
  }
  return(
    <div className="searchResultsContainer">

  {filteredHotels.map((hotel) => (

    <div
      className="searchResultsHotelCard"
      key={hotel.id}
    >

      <div className="searchResultsImageWrapper">
        <img
          className="searchResultsHotelImage"
          src={hotel.hotelThumbanaile}
          alt={hotel.hotelName}
        />
      </div>

      <div className="searchResultsHotelContent">

        <h3 className="searchResultsHotelName">
          {hotel.hotelName}
        </h3>

        <p className="searchResultsHotelLocation">
          {hotel.location?.city},{" "}
          {hotel.location?.state}
        </p>

        <div className="searchResultsPriceWrapper">
          <p className="searchResultsHotelPrice">
            ₹{hotel.pricing?.priceperNight}
          </p>

          <span className="searchResultsPriceUnit">
            / night
          </span>
        </div>

      </div>

    </div>

  ))}

  {searchData && filteredHotels.length === 0 && (

    <div className="searchResultsEmpty">

      <h3 className="searchResultsEmptyTitle">
        No hotels available
      </h3>

      <p className="searchResultsEmptyMessage">
        No hotels available for the selected dates.
      </p>

    </div>

  )}

</div>
  )

}