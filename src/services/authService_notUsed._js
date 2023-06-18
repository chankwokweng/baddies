import { getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { dataServiceGetProfile } from "../services";

const currentUser = {
  uid: "",
  userName : "",
  userEmail: "",
  userPhoneNumber: "",
  userPhotoURL : ""
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

      console.log("onAuthStateChanged - User Logged In");
      // console.log(user);
      currentUser.uid = user.uid;
      currentUser.userName = user.displayName ? user.displayName : "";
      currentUser.userEmail = user.email ? user.email : "";
      currentUser.userPhoneNumber = user.phoneNumber ? user.phoneNumber : "";
      currentUser.userPhotoURL = user.photoURL? user.photoURL : "";

      // console.log(currentUser);

      return true;
  } else {
    // User is signed out
    // ...
    console.log("onAuthStateChanged - User Logged Out");
    currentUser.uid               = "";
    currentUser.userName          = "";
    currentUser.userEmail         = "";
    currentUser.userPhoneNumber   = "";
    currentUser.userPhotoURL      = "";
    return false;
  }
});

export function authServiceGetCurrentUser(){
  return (currentUser);
}

export async function authServiceLogin(authDetail){

//   const data = useCurrentUser();

    signInWithEmailAndPassword(auth, authDetail.email, authDetail.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(userCredential);
      return (userCredential);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error:" + errorCode + errorMessage);
      return(error);
    });

    // if(!response.ok){
    //     throw { message: response.statusText, status: response.status }; //eslint-disable-line
    // }
    // const data = await response.json();

    // if(data.accessToken){
    //     sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    //     sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    // }
// console.log("login");
    return;
}

export async function authServiceLoginGoogle() {

    signInWithPopup(auth, googleAuthProvider)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log("signInWithPopup:");
      // console.log(userCredential);
      // alert("login");

      return (userCredential);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error:" + errorCode + errorMessage);
      alert("login error:" + errorCode + errorMessage);

      return(error);

    });

    // if(!response.ok){
    //     throw { message: response.statusText, status: response.status }; //eslint-disable-line
    // }
    // const data = await response.json();

    //     sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    //     sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    // }
console.log("signInWithPopup - 0");
    return;
}

export async function authServiceRegister(authDetail){

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, authDetail.email, authDetail.password)
        // console.log(userCredential);

        const user = userCredential.user;
        // console.log("register");
        // console.log(user);

        //--- save to local storage
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("uid", JSON.stringify(user.uid));
        // ...
        return({uid:user.uid});
    }
    catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("register fail" + errorCode);
        console.log(errorMessage);
        // ..
    };
    // return;
}

export function authServiceLogout(){
    sessionStorage.removeItem("uid");
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed Off...");
      }).catch((error) => {
        // An error happened.
      });
}

