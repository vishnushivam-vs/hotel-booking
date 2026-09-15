import "./AddHotel.css";

export const HotelImageAdd = ({ closeImageAdd }) => {
    return (
        <div className="imgUplodcontainer">
             <h3>Hotel Images</h3>
            <button className="clsBtnImgApld"
                onClick={() => closeImageAdd(true)}
            >close</button>
            <div className="ThumbanailConatainer">
                <label className="HotelThumbanail">
                    <img src="" alt="" />
                    <input className="inputImgfile" type="file" />
                </label>
            </div>


            <div className="roomImgContainer">
                <label className="RoomImg">
                    <img src="" alt="" />
                    <input className="inputImgfile" type="file" />
                </label>

                <label className="RoomImg">
                    <img src="" alt="" />
                    <input className="inputImgfile" type="file" />
                </label>

                <label className="RoomImg">
                    <img src="" alt="" />
                    <input className="inputImgfile" type="file" />
                </label>

                <label className="RoomImg">
                    <img src="" alt="" />
                    <input className="inputImgfile" type="file" />
                </label>
            </div>
            <button className="ImgUplodBtn">Upload image</button>
        </div>
    );
};