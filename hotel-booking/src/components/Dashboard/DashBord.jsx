
import { useNavigate } from 'react-router-dom'
import './DashBoard.css'
import { useState } from 'react';
import { Logout } from '../Logout/Logout';

export const DashBord = ({ closeDash }) => {

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate()

 
  return (
    <div className='dashBoardContainer'>

     
      <button className='dashboard'
        onClick={closeDash}
      >X</button>
      <div className='dashClms'
       onClick={() => (navigate("/Profile"))}
      >
        <div className='dasbordIcons'>
          <img className='dasbrdImg' src="profile.png" alt="" />
        </div>
        <p>Profile</p>
      </div>
      <div className='dashClms'
        onClick={() => (navigate("/Myhotels"))}
      >
        <div className='dasbordIcons'>

        </div>
        <p>MyHotels</p>
      </div>
      <div className='dashClms'
        onClick={() => (navigate("/AddHotel"))}
      >
        <div className='dasbordIcons'>

          <img className='dasbrdImg' src="resort.png" alt="" />
        </div>
        <p>List your Property</p>
      </div>
      <div className='dashClms'
        onClick={() => (navigate("/Mybooking"))}
      >
        <div className='dasbordIcons'>
          <img className='dasbrdImg' src="reservation.png" alt="" />
        </div>
        <p>My Bookings</p>
      </div>

      <div className='dashClms'  onClick={() => alert("About section is currently unavailable.")}>
        <div className='dasbordIcons'  >
        </div>
        <p>About</p>
      </div>
      <div className='dashClms'
       onClick={() => setShowLogoutPopup(true)}
      >
        <div className='dasbordIcons'>
          
        </div>

        <p>LogOut</p>
      </div>
           {showLogoutPopup && (
                <Logout
                    closePopup={() => setShowLogoutPopup(false)}
                />
            )}
    </div>
  )
}
