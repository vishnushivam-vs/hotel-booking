import { collection } from "firebase/firestore";
import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react"
import { fetchFromFirestore, firestore } from "../Firebase/Firebase";

const HotelContext = createContext(null);
//const HoteldataContext = useContext(context);

export const HotelDataContext = () => {

  const [hoteldata, setHotelData] = useState(null)
  useEffect(() => {

    const fetchHotelData = async () => {
      try {
        const fetchHoteldata = await fetchFromFirestore();
        setHotelData(fetchHoteldata);

      } catch (error) {
        console.log("error context", error);

      }

      fetchHotelData()


    }, [])

  return (
   < HotelContext.Provider value={{hoteldata, setHotelData}}>
    {Children}
   </HotelContext.Provider>
  )
}

export const useHotelData = () => {
  return useContext(HotelContext)
};