
import { useNavigate } from 'react-router-dom'
import './Navebar.css'

import { userAuth } from '../context/userauth';


export const Navebar = () => {
    const navigate = useNavigate();

    const { user } = userAuth()
    return (
        <>
            <div className="topBox">
                <div className='topeLefttscetion'>
                     <button className="homeBtn"
                    onClick={() => navigate("/")}
                >Home</button>
                <button className="aboutBtn">About</button>
                <button className="roomsBtn"
                    onClick={() => navigate("/Rooms")}
                >Rooms</button>
                <button className="signBtn"
                    onClick={() => (navigate("/AddHotel"))}
                >Sign In</button>
                </div>
                
               <div className='topBoxRightsection'>
                     {
                    user ? (
                        <div className='profileImgBox'>
                            <img className='profileimg'
                                src="profile.png"
                                alt=""
                                width="40"
                            />

        
                        </div>
                    ) : (
                        <div>
                           <button className="signBtn"
                            onClick={() => (navigate("/loginPage"))}
                           >Login</button>
                        </div>
                    )
                }
               </div>

                
            </div>

        </>
    )
}
