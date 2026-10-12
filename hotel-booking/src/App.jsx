import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { HotelDtlsPage } from "./components/HotelDetails/HotelDetlsPage";
import { AddHotel } from "./components/Admin/AddHotel";
import { HotelDataContext } from "./components/context/hotelData";
import { Bookingpage } from "./components/Bookingpage/Bookingpage";
import { Rooms } from "./components/Rooms/Rooms";
import { Login } from "./components/LoginPage/Login";
import { Mybooking } from "./components/MyBookings/Mybooking";
import { Myhotels } from "./components/Adminproperty/Myhotels";
import { Profile } from "./components/profile/Profile";
import { EdithotelData } from "./components/EditProperty/EdithotelData";

const App = () => {

  return (
    <HotelDataContext>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/HotelDtlsPage" element={<HotelDtlsPage />} />
          <Route path="/AddHotel" element={<AddHotel />} />
          <Route path="/Bookingpage" element={<Bookingpage />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/Mybooking" element={<Mybooking />} />
          <Route path="/Myhotels" element={<Myhotels />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EdithotelData" element={<EdithotelData />} />

        </Routes>
      </BrowserRouter>
    </HotelDataContext>
  )
}
export default App
