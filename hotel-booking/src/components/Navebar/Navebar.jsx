
import { useNavigate } from 'react-router-dom'
import './Navebar.css'
import { AddHotel } from '../Admin/AddHotel';

export const Navebar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="topBox">
                <button className="homeBtn">Home</button>
                <button className="aboutBtn">About</button>
                <button className="roomsBtn">Rooms</button>
                <button className="signBtn"
                onClick={()=> (navigate("/AddHotel"))}
                >Sign In</button>

            </div>
           
        </div>
    )
}
