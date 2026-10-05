import { useNavigate } from "react-router-dom"
import { useHotelData } from "../context/hotelData"


export const HotelsCart = () => {

  const { hoteldata } = useHotelData()
  const navigate = useNavigate()

  /* const [hotels, setHotels] = useState([]);

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

  }

   if (availabilityLoading) {
    return <p>Checking hotel availability...</p>;
  }*/
  return (
    <div className="hotelsCartdataContainer">
      {
        hoteldata.map((data) => (
          <div className="dtlsCartscetion" key={data.id}
            onClick={() => {
              navigate('/HotelDtlsPage', { state: data });
              window.scrollTo(0, 0);
            }}>
            <div className="htlroomiamgeBox">
              <img className="htlimg" src={data.hotelThumbanaile} alt="" />
            </div>
            <div className="bottomSection">
              <div className="htlNamebox">
                <h4>{data.hotelName}</h4>

              </div>
              <div className="htlCartbottomBox">
                <h4>price : <label className="htlPrice">  ₹ {data.pricing.priceperNight} /day</label></h4>
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
