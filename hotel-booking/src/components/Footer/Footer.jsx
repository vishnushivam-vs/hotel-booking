
import './Footers.css'
export const Footer = () => {
  return (
    <div>
        <div className="downSectionContainer">
            <div className="destinationTopBox">
                <div className="dwnCart">
                    <h4 className="linksHead">Quick Links</h4>
                    <div className="linkBox">
                        <p className="links">Home</p>
                        <p className="links">About</p>
                        <p className="links">Rooms</p>
                        <p className="links">Contact</p>
                    </div>

                </div>
                <div className="dwnCart">
                    <h4 className="linksHead">Help</h4>
                    <div className="linkBox">
                        <p className="links">Help Center</p>
                        <p className="links">Privacy Policy</p>
                        <p className="links">Cookie Policy</p>
                        <p className="links">Blog</p>
                    </div>
                </div>

                <div className="dwnCart">
                    <h4 className="linksHead">Extra Links</h4>
                    <div className="linkBox">
                        <p className="links">FAQs</p>
                        <p className="links">Terms & Conditions</p>
                        <p className="links">Privacy Policy</p>
                        <p className="links">Support</p>
                    </div>
                </div>



            </div>
            <div className="logosSection">
                <a href="https://www.instagram.com/yourusername" target="_blank">
                    <div className="logoImgBox">
                        <img className="logoImg" src="https://img.icons8.com/?size=128&id=RhYNENh5cxlS&format=png" alt=""
                            set=""/>
                    </div>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank">
                    <div className="logoImgBox">
                        <img className="logoImg" src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png" alt=""
                            set=""/>
                    </div>
                </a>
                <a href="https://www.facebook.com/yourusername" target="_blank">
                    <div className="logoImgBox">
                        <img className="logoImg" src="https://img.icons8.com/?size=128&id=61nQcivxf1dj&format=png" alt=""
                            set=""/>
                    </div>
                </a>

            </div>


        </div>


    </div>
  )
}
