
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { fetchFromFirestore } from "../Firebase/Firebase";

const HotelContext = createContext(null);

export const HotelDataContext = ({ children }) => {

  const [hoteldata, setHotelData] = useState([]);

  useEffect(() => {

    const fetchHotelData = async () => {
      try {

        const fetchHoteldata = await fetchFromFirestore();

        setHotelData(fetchHoteldata);

      } catch (error) {

        console.log("error context", error);

      }
    };

    fetchHotelData();

  }, []);

  return (
    <HotelContext.Provider value={{ hoteldata, setHotelData }}>
      {children}
    </HotelContext.Provider>
  );
};


export const useHotelData = () => {
  return useContext(HotelContext);
};

