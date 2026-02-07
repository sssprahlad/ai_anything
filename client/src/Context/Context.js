import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [SaloonId, setSaloonId] = useState(null);
    const [userId, setUserId] = useState(null);


    return (
        <UserContext.Provider value={{ SaloonId, setSaloonId, userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}

