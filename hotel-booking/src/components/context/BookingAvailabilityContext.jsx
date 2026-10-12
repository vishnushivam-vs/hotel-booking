import { createContext, useContext, useEffect, useState } from "react";
import {
    collection,
    getDocs
} from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";

const BookingAvailabilityContext = createContext(null);

export const BookingAvailabilityProvider = ({ children }) => {

    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchAvailability = async () => {

        try {

            setLoading(true);

            const snapshot = await getDocs(
                collection(firestore, "HotelAvailability")
            );

            const availabilityData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setAvailability(availabilityData);

        } catch (error) {

            console.log("Availability fetch error:", error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchAvailability();

    }, []);

    const isHotelAvailable = (hotelId, checkin, checkout) => {

        if (!hotelId || !checkin || !checkout) {
            return false;
        }

        const existingBookings = availability.filter(
            (booking) =>
                booking.hotelId === hotelId
        );

        const conflict = existingBookings.some((booking) => {

            const existingCheckin = booking.checkin;
            const existingCheckout = booking.checkout;


            return (
                checkin < existingCheckout &&
                checkout > existingCheckin
            );

        });

        return !conflict;
    };


    return (
        <BookingAvailabilityContext.Provider
            value={{
                availability,
                loading,
                isHotelAvailable,
                fetchAvailability
            }}
        >
            {children}
        </BookingAvailabilityContext.Provider>
    );
};


export const useBookingAvailability = () => {

    return useContext(BookingAvailabilityContext);

};