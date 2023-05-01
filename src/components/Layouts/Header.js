import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/old_shuttle.jpg";
import { DropdownLoggedOut, DropdownLoggedIn } from "../index";
import { getUsers} from "../../services";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const [dropdown, setDropdown] = useState(false);
  const uid = JSON.parse(sessionStorage.getItem("uid"));

  // console.log(uid);
  useEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
      
      if(darkMode){
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [darkMode]);

  return (
      <header>      
      <nav className="bg-white dark:bg-gray-900">
          <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
              <Link to="/" className="flex items-center">
                  <img src={Logo} className="mr-3 h-10" alt="CodeBook Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Baddies</span>
              </Link>
              <div className="flex items-center relative">
                  <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
{/* <span onClick={() => getUsers()} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-question-circle"></span> */}
                  {/* { dropdown && ( uid ? <DropdownLoggedIn setDropdown={setDropdown} /> : <DropdownLoggedOut setDropdown={setDropdown} /> ) } */}
              </div>
              <span onClick={() => setDropdown(!dropdown)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
              { dropdown && ( uid ? <DropdownLoggedIn setDropdown={setDropdown} /> : <DropdownLoggedOut setDropdown={setDropdown} /> ) }

          </div>
      </nav>
      
    </header>
  )
}
