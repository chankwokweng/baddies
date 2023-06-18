import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/config";
import { currentUserReducer } from "../reducers";

const userInitialState = {
    uid: "",
    userName : "",
    userEmail: "",
    userPhoneNumber: "",
    userPhotoURL : ""
}

const CurrentUserContext = createContext(userInitialState);

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(userInitialState);

    const updateCurrentUserInfo = (user) => {
console.log("currentUser");
currentUser.uid = user.uid;
console.log("currentUser");

    }

    function clearCurrentUser(){

    } 




    return (
        <CurrentUserContext.Provider value={{currentUser, updateCurrentUserInfo}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    return context;
}

