import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./components/Home/Home"
//import { Navebar } from "./components/Navebar/Navebar"
import { HotelDtlsPage } from "./components/HotelDetails/HotelDetlsPage"
import { AddHotel } from "./components/Admin/AddHotel"
import { HotelDataContext } from "./components/context/hotelData"
import { Bookingpage } from "./components/Bookingpage/Bookingpage"
import { Rooms } from "./components/Rooms/Rooms"
import { Login } from "./components/LoginPage/Login"

 const App = () => {
  
  return (
    <HotelDataContext>
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />}/>
        <Route path="/HotelDtlsPage" element={<HotelDtlsPage />}/>
        <Route path="/AddHotel" element={<AddHotel/>}/>
        <Route path="/Bookingpage" element={<Bookingpage/>}/>
        <Route path="/Rooms" element={<Rooms/>}/>
        <Route path="/LoginPage" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </HotelDataContext>
  )
}
export default App
// <Route path="Navebar" element={<Navebar/>}/>
//<Route path="HotelDtlsPage" element={<HotelDtlsPage />}/>