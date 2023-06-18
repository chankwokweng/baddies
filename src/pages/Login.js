import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth, facebookAuthProvider, googleAuthProvider } from "../firebase/config";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useTitle } from "../hooks/useTitle";


export const Login = () => {
  useTitle("Login");
  const navigate = useNavigate();
  
  async function handleLogin(event){
    event.preventDefault();
    try{

        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log("signInWithEmailAndPassword - login");
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //--- save to local storage
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("uid", JSON.stringify(user.uid));

        // console.log(userCredential);
        user.uid ? navigate("/events") : toast.error("Error after signInWithEmailAndPassword ");
        return (userCredential);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;

        //--- save to local storage
        sessionStorage.removeItem("isAuth");
        sessionStorage.removeItem("uid");

        toast.error(error.message, {closeButton: true, position: "bottom-center"});
        return(error);  
      }); 
    }catch(error) {
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }


  async function handleLoginViaApple(event){
      event.preventDefault();
  }

  async function handleLoginViaXXX(provider, event){
    event.preventDefault();
    try{
      signInWithPopup(auth, provider==='Google'?googleAuthProvider:facebookAuthProvider)
      .then((userCredential) => {
        console.log("signInWithPopup:");

        // Signed in 
        const user = userCredential.user;
        //--- save to local storage
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("uid", JSON.stringify(user.uid));

        // console.log(userCredential);
        user.uid ? navigate("/events") : toast.error("Error after handleLoginViaGoogle ");
        return (userCredential);
  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        //--- save to local storage
        sessionStorage.removeItem("isAuth");
        sessionStorage.removeItem("uid");
        

        console.log("Error:" + errorCode + errorMessage);
        return(error);
  
      });
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }

  return (
    <main className='dark:bg-gray-800'>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Login</p>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="email@example.com" required autoComplete="email" />
          </div>
          <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
              <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required minLength="8" autoComplete="current-password"/>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>
      </section>


      <p>
        <button onClick={(e)=>handleLoginViaXXX('Google',e)} className="mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login via Google</button>
      </p>
      
      <p>
        <button onClick={(e)=>handleLoginViaXXX('Facebook',e)} className="mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login via Facebook</button>
      </p>
      
      <p>
        <button onClick={handleLoginViaApple} className="mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login via Apple</button>
      </p>
    </main>
  )
}