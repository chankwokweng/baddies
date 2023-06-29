import { useState, useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import { useParams } from "react-router-dom";

import { GroupCard } from "../../components/Elements/GroupCard";
import { dataServiceGetGroup } from "../../services/dataService";

export const GroupPage = () => {
    useTitle("Group Members and Events");

    const uid = JSON.parse(sessionStorage.getItem("uid"));
    const groupID = useParams().id;
    console.log("useParams:", groupID);
    async function getGroupDetail() { dataServiceGetGroup(groupID).then(
        (data) => {
            console.log("getGroupDetail data");
            console.log(data);
            setGroup(data);        
    })};

    const [group, setGroup] = useState(null);
    useEffect( ()=>{getGroupDetail()}, []);
 
      const handleChange = (event) => {
      }
  
      const handleEditGroup = () => {
          // console.log("handleEditGroup");  
      }
      async function saveGroup(e){
      }
      
    return (
        group == null? <div></div>
        :
        <div className="p-5 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="relative" >
                <span> <img className="rounded-t-lg w-12 h-12" src={group.groupPhotoURL} alt={group.groupName} /> </span>
                <span className="absolute top-0 right-0 px-2 bg-orange-500 bg-opacity-90 text-white rounded" onClick={handleEditGroup}>Edit</span>
            </div>

            <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group ID: <span className="text-gray-100 dark:text-lime-300">{group.groupID}</span></p>
            <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Name: <span className="text-gray-100 dark:text-lime-300">{group.groupName}</span></p>
            <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Country: <span className="text-gray-100 dark:text-lime-300">{group.groupCountry}</span></p>
            <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> City: <span className="text-gray-100 dark:text-lime-300">{group.groupCity}</span></p>
            {/* <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group Levels: <span className="text-gray-100 dark:text-lime-300">{group.groupLevelOfPlay.toString()}</span></p> */}
            <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group Info: <span className="text-gray-100 dark:text-lime-300">{group.groupInfo}</span></p>
            {/* {group.members.length? <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Number of Members: <span className="text-gray-100 dark:text-lime-300">{group.members.length}</span></p>  */}
                                {/* : ""} */}
            {/* {group.events.length? <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Number of Events: <span className="text-gray-100 dark:text-lime-300">{group.events.length}</span></p> */}
                                {/* : ""} */}

        </div>
    )
}
  