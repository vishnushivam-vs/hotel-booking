import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import { useContext } from "react";

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (curentUser) => {
            setUser(curentUser);
            setLoading(false)
        });
        return () => unSubscribe()
    },[]);

    return (

        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const userAuth = () => {
    return useContext(AuthContext);
}