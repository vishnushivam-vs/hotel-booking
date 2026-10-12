import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA5oFD6vO1_LmYrSooNa9iGOMkWI8TShxs",
  authDomain: "hotelbookingapp-cf4d0.firebaseapp.com",
  projectId: "hotelbookingapp-cf4d0",
  storageBucket: "hotelbookingapp-cf4d0.firebasestorage.app",
  messagingSenderId: "517008422428",
  appId: "1:517008422428:web:bb2a7d3224b868038a11d9",
  measurementId: "G-T4XW753S0Z"
};

const app = initializeApp(firebaseConfig);

 export const firestore = getFirestore(app);
  export const storage = getStorage(app);
  export const auth = getAuth(app)
  export const provider = new GoogleAuthProvider()
export const fetchFromFirestore = async () => {
  try {
    const hotelsCollection = collection(
      firestore, 
      "Hoteldetails"
    );

    const hotelSnapshot = await getDocs(hotelsCollection);

    const hotelLists = hotelSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return hotelLists;

  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};