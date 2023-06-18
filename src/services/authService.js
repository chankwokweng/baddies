import { signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
  
        console.log("onAuthStateChanged - User Logged In :", user.email);
  
        return true;
    } else {
      // User is signed out
      // ...
      console.log("onAuthStateChanged - User Logged Out");
      return false;
    }
  });


export function authServiceLogout(){
    sessionStorage.removeItem("uid");
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed Off..."); 
      }).catch((error) => {
        // An error happened.
      });
}

