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


    // Firestore-il ninnu HotelAvailability data edukkuka
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

            console.log("Hotel availability:", availabilityData);

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


    // Hotel available aano check cheyyuka
    const isHotelAvailable = (hotelId, checkin, checkout) => {

        if (!hotelId || !checkin || !checkout) {
            return false;
        }


        // Selected hotel-inte existing bookings mathram edukkuka
        const existingBookings = availability.filter(
            (booking) =>
                booking.hotelId === hotelId
        );


        // Date overlap check
        const conflict = existingBookings.some((booking) => {

            const existingCheckin = booking.checkin;
            const existingCheckout = booking.checkout;


            return (
                checkin < existingCheckout &&
                checkout > existingCheckin
            );

        });


        // Conflict undenkil false
        // Conflict illenkil true
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