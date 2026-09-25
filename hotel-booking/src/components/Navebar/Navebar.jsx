
import { useNavigate } from 'react-router-dom'
import './Navebar.css'

import { userAuth } from '../context/userauth';
import { useState } from 'react';
import { DashBord } from '../Dashboard/DashBord';


export const Navebar = () => {
    const navigate = useNavigate();

    const { user } = userAuth()
    const [showdashBoard , setShowdashBoard] = useState(false)
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
               
                </div>
                
               <div className='topBoxRightsection'>
                     {
                    user ? (
                        <div className='profileImgBox'
                        onClick={() => setShowdashBoard(true)}
                        >
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
            {
                showdashBoard ? <DashBord closeDash={() => setShowdashBoard(false)}/> : " "
            }
                  
        </>
    )
}
