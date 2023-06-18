import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query'
import { queryClient } from "../..";

import { useTitle } from "../../hooks/useTitle";
import { GroupCard } from "../../components/Elements/GroupCard";
import { dataServiceGetGroups } from "../../services/dataServiceReactQuery";
import { Events } from "../../components/Elements/Events";

const __groups = [];
const _groups = [
  { 
    groupID: "10",
    groupName: "Group 1",
    groupPhotoURL: "https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3",
    groupInfo: "Hi ... please join me ... this is a friendly group playing in the East",
    groupLevelOfPlay: "HB,LI",
    members : [
      {id:"m1"},
      {id:"m2"}
    ]
  },
  { 
    groupID: "20",
    groupName: "Group 2",
    groupPhotoURL: "https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3",
    groupInfo: "Hi ... please join me ... this is a friendly group playing in the East",
    groupLevelOfPlay: "HB,LI",
    members : [
      {id:"m1"},
      {id:"m2"}
    ]
  }
]


export const OrganizerPage = () => {
  useTitle("Organizing My Groups and Events");

  const uid = JSON.parse(sessionStorage.getItem("uid"));
  console.log("OrganizerPage:", uid);

  const {isLoading, isError, data:groups, error} = useQuery({
    queryKey: ["groups"],
    queryFn: ()=> dataServiceGetGroups(uid),
  });
  const [activeGroupIdx, setActiveGroupIdx] = useState("-2");

  async function getGroups() {
    return await dataServiceGetGroups(uid);
  }

  function handleGroupChange (e) {
    // console.log(e.target.value);
    // console.log(groups[e.target.value]);
    setActiveGroupIdx(e.target.value);
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
// console.log(groups);
  return (
  <div>
    {/* --- List of Groups  --- */}
    <div>
      <select className="w-full py-5 bg-orange-950 text-lg text-gray-50 text-center font-bold" onChange={handleGroupChange}>
        <option className="w-1/4" key= {"random1"} value="-2">Select Group</option>

        {groups.map( (g,index) => (
          <option className="w-1/4" key= {g.groupID} value={index}>{g.groupName}</option>
        ))}
          <option className="w-1/4" key= {"random2"} value="-1">Create New Group</option>
      </select>
      </div>
          {/*-1=New, -2=N/A  otherwise View  */}
      <div>
        { (activeGroupIdx==="-1")? <GroupCard Group={groups[activeGroupIdx]} Mode={"New"}> </GroupCard> :
          (activeGroupIdx==="-2")?"":
                              <div>
                                <GroupCard Group={groups[activeGroupIdx]} Mode={"View"}> </GroupCard>
                                <span className="px-2 bg-orange-500 bg-opacity-90 text-white rounded" onClick={()=>{}}>New Event</span>

                                <Events uid={uid}>

                                </Events>
                              </div>
        }
      </div>
    </div>
  ) 
}
