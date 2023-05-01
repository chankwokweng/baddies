import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dataServiceGetUserSession, authServiceLogout } from "../../services";

export const DropdownLoggedIn = ({setDropdown}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
// console.log("data");

    useEffect(() => {
        async function fetchData(){
            try{
                const data = await dataServiceGetUserSession();
                // console.log(data);
                data.uid ? setUser(data) : handleLogout();
            } catch(error){
                toast.error(error.message, { closeButton: true, position: "bottom-center" });
            }            
        }
        fetchData();
    }, []); //eslint-disable-line

    function handleLogout(){
        authServiceLogout();
        setDropdown(false);
        navigate("/");
    }

  return (
    <div id="dropdownAvatar" className="select-none	absolute top-10 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
            <div className="font-medium truncate">{user.email}</div>
        </div>
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
            <li>
                <Link onClick={() => setDropdown(false)} to="/organizer" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Organizer</Link>
            </li>
            <li>
                <Link onClick={() => setDropdown(false)} to="/profile" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
            </li>
        </ul>
        <div className="py-1">
            <span onClick={handleLogout} className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</span>
        </div>
    </div>
  )
}