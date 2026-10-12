import React, { useState } from "react";
import "./AddHotel.css";

export const HotelImageAdd = ({ closeImageAdd, onImagesChange }) => {

    const [thumnail, setThumbnail] = useState(null);
    const [roomImages, setRoomimages] = useState([]);

    const handleThumbnail = (e) => {

        const file = e.target.files[0]

        if (!file) return;
        setThumbnail(file);
        onImagesChange({

            thumnail: file,
            roomImages: roomImages
        })
        e.target.value = "";
    };

    const handleRoomImages = (e) => {

        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const roomImagesSlots = 4 - roomImages.length;

        if (files.length > roomImagesSlots) {
            alert("Maximum 4 room images allowed")
            e.target.value = "";
            return;
        }
        const updatedImages = [
            ...roomImages,
            ...files
        ]


        setRoomimages(updatedImages)
        onImagesChange({
            thumnail: thumnail,
            roomImages: updatedImages
        })
        e.target.value = "";
    }

    const handleRemoveImage = (index) => {

        const updatedImages = roomImages.filter(
            (_, imageIndex) => imageIndex !== index);

        setRoomimages(updatedImages);

        onImagesChange({
            thumnail: thumnail,
            roomImages: updatedImages
        });

    };
    return (
        <div className="imgUplodcontainer">
            <h3>Hotel Images</h3>
            <button className="clsBtnImgApld"
                onClick={() => closeImageAdd(true)}
            >close</button>
            <div className="ThumbanailConatainer">
                <label className="HotelThumbanail" >
                    {
                        thumnail && (
                            <img className="uplodImage"
                                src={URL.createObjectURL(thumnail)}
                                alt="" />
                        )
                    }
                    <input className="inputImgfile" type="file"
                        onChange={handleThumbnail} />
                </label>
            </div>


            <div className="roomImgContainer">

                {
                    roomImages.map((file, index) => (
                        <React.Fragment key={index}>
                            <div >

                                <label className="RoomImg" >

                                    <img
                                        className="uplodImage"
                                        src={URL.createObjectURL(file)}
                                        alt={`room ${index + 1}`}
                                    />

                                </label>
                            </div>
                            <div className="removBtnBox">
                                <button
                                    className="removeImgBtn"
                                    onClick={() => handleRemoveImage(index)}
                                >×</button>
                            </div>

                        </React.Fragment>
                    ))
                }

                {
                    roomImages.length < 4 && (
                        <label className="RoomImg">
                            <span>+ Add Images</span>

                            <input
                                className="inputImgfile"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleRoomImages}
                            />

                        </label>
                    )
                }

            </div>
        </div >
    );
};
