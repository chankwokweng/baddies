import { useState, useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import { GroupCard } from "../../components/Elements/GroupCard";
import { dataServiceGetGroups } from "../../services/dataService";

// const __groups = [];

// const _groups = [
//   { 
//     groupID: "10",
//     groupName: "Group 1",
//     groupPhotoURL: "https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3",
//     groupInfo: "Hi ... please join me ... this is a friendly group playing in the East",
//     groupLevelOfPlay: "HB,LI",
//     country: "Singapore",
//     city: "AMK",
//     members : [
//       {id:"m1"},
//       {id:"m2"}
//     ],
//     events : [
//       {id:"xxx"},
//       {id:"yyy"}
//     ]
//   },
//   { 
//     groupID: "20",
//     groupName: "Group 2",
//     groupPhotoURL: "https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3",
//     groupInfo: "Hi ... please join me ... this is a friendly group playing in the East",
//     groupLevelOfPlay: "HB,LI",
//     country: "Singapore",
//     city: "AMK",
//     members : [
//       {id:"m1"},
//       {id:"m2"}
//     ],
//     events : [
//       {id:"xxx"},
//       {id:"yyy"}
//     ]
//   }
// ]


export const MemberPage = () => {
  useTitle("My Groups and Events");

  const uid = JSON.parse(sessionStorage.getItem("uid"));
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState(false);


  async function getGroups() {
    dataServiceGetGroups(uid)
    .then((data) => {
          console.log("MemberPage getGroups");
          console.log(data);
          setGroups(data);
        });    
  }


  useEffect( () => {
    getGroups();
  },[]);
  
  return newGroup? 
      <>
        <GroupCard Group={null} Mode={"New"}> </GroupCard>
        <button onClick={(e)=>{setNewGroup(false);getGroups()}} className="mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Return</button>
      </>        
    :
      <div>
        <button onClick={(e)=>setNewGroup(true)} className="mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">New Group</button>

        {/* --- List of Groups  --- */}
        <div>
            {groups.map( (g) => (
                <GroupCard key= {g.groupID} Group={g} Mode={"View"}> </GroupCard>
            ))}
        </div>
    </div>
}
