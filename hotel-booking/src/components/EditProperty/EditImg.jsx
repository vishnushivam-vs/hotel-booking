import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { firestore } from '../Firebase/Firebase';

export const EditImg = ({ hotelData, setHotelData, hotelId }) => {

    const [showImageInput, setShowImageInput] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState(false);

    const uploadToCloudinary = async (file) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Vishnu");

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/xbnoalu4/image/upload",
            {
                method: "POST",
                body: formData
            }
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Cloudinary image upload failed", errorData)
        }

        const data = await response.json()
        return data.secure_url;
    }

    const handleChangeImage = () => {
        setShowImageInput(!showImageInput);
    };

    const handleThumbnailChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return

        try {

            setUploading(true);
            const imgUrl = await uploadToCloudinary(file);
            setHotelData((prev) => ({
                ...prev,
                hotelThumbanaile: imgUrl
            }))

            await updateDoc(
                doc(firestore, "Hoteldetails", hotelId),
                { hotelThumbanaile: imgUrl }
            )
            setShowImageInput(false)
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setUploading(false)
        }
    }


    const handleRemoveImage = async (index) => {

        setRemoving(true);

        try {

            const updatedImages = hotelData.images.filter(
                (_, imageIndex) => imageIndex !== index
            );

            setHotelData((prev) => ({
                ...prev,
                images: updatedImages
            }));

            await updateDoc(
                doc(firestore, "Hoteldetails", hotelId),
                {
                    images: updatedImages
                }
            );

        } catch (error) {

            console.error("Image remove failed:", error);

        } finally {

            setRemoving(false);
        }

    }

    const handleAddRoomImage = async (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        if (hotelData.images.length >= 4) {

            alert(
                "Maximum 4 room images allowed"
            );

            e.target.value = "";
            return;
        }
        try {

            setUploading(true);
            const newImageUrl =
                await uploadToCloudinary(file);
            const updatedImages = [
                ...hotelData.images,
                newImageUrl
            ];
            setHotelData((prev) => ({
                ...prev,
                images: updatedImages
            }));


            await updateDoc(
                doc(
                    firestore,
                    "Hoteldetails",
                    hotelId
                ),
                {
                    images: updatedImages
                }
            );


        } catch (error) {

            console.error(
                "Room image upload failed:",
                error
            );

        } finally {

            setUploading(false);
            e.target.value = "";
        }
    };



    return (
        <div>

            <section className="editSection" >

                <div className="sectionHeading">

                    <h2>Property Images</h2>

                    <p>
                        Manage your property's photos
                    </p>

                </div>

                <div className="imageSection">

                    <h3>Property Cover Image</h3>

                    <div className="thumbnailBox">

                        {hotelData.hotelThumbanaile ? (

                            <img
                                src={hotelData.hotelThumbanaile}
                                alt="Hotel Cover"
                            />

                        ) : (

                            <div className="noImage">
                                No cover image
                            </div>

                        )}



                    </div>

                    <button
                        className="changeImageBtn"
                        type="button"
                        onClick={handleChangeImage}
                    >
                        {uploading
                            ? "Uploading..."
                            : showImageInput
                                ? "Cancel"
                                : "Change Cover Image"
                        }
                    </button>

                    {showImageInput && (
                        <label htmlFor="imageInput" className="changeImageinput">
                            Choose File
                        </label>
                    )}

                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        style={{ display: "none" }}
                    />
                </div>



                <div className="imageSection">

                    <h3>Hotel Gallery</h3>

                    <div className="galleryGrid">
                        {hotelData.images.map((img, index) => (
                            <div className="galleryItem" key={index}>

                                <img src={img} alt="" />
                                <button
                                    className="removeImageBtn"
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    Remove
                                </button>

                            </div>

                        ))}


                        <label className="addImageBox"

                        >

                            <span>+</span>

                            <p>
                                {uploading
                                    ? "Uploading..."
                                    : "Add Image"
                                }
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleAddRoomImage
                                }
                                disabled={uploading}
                                style={{
                                    display: "none"
                                }}
                            />

                        </label>

                    </div>

                </div>

            </section>


        </div>
    )
}
