import { useState } from "react";
import { dataServiceUploadFile,dataServiceSaveGroup } from "../../services/dataService";
// import {constLevelOfPlayList} from "../../constants";
import { LevelCard } from "./LevelCard";
import { useNavigate } from "react-router-dom";

export const GroupCard = ({Group:_group, Mode:mode}) => {
    
    const navigate = useNavigate();

    // Mode = "New", "View", "Edit" 
    const [editMode,setEditMode] = useState(false);  
    const uid = JSON.parse(sessionStorage.getItem("uid"));
    const isNew = mode==="New"? true: false;

    const [group, setGroup] = useState(_group? _group: { 
        groupID:"",  
        groupPhotoURL:"https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3",
        groupName:"", 
        groupCountry:"Singapore", 
        groupCity:"", 
        groupInfo:"", 
        groupLevelOfPlay:"", 
        members:[],
        membersPendingApproval:[],
        membersInactive:[],
        events:[],
        eventsPast:[]
        });
    
    const handleGroupDetails = () => {
        navigate("/groups/"+group.groupID);
    }

    const handleChange = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        // console.log("name:value", name, ':', value);  
        setGroup(values => ({...values, [name]: value}))
    }

    const handleEditGroup = () => {
        // console.log("handleEditGroup");  
        setEditMode(!editMode);
    }
    async function saveGroup(e){
        e.preventDefault();
        try {
            // console.log("saveGroup:", uid);
            // console.log(group);
            await dataServiceSaveGroup(uid, group);        // if uid is blank, it is a new group
        } catch (e) {
            alert("Exception SaveGroup:", e.message);
        }
        setEditMode(false);
    }
    
    async function changePicture(fileObject) {
        try {
            console.log("GroupCard changePicture:");
            console.log(fileObject);

            if (fileObject.target.value!==""){
                const newURL = await dataServiceUploadFile(group.groupID, "groups", fileObject);
                console.log("newURL:", newURL);
                setGroup(data=>({...data, groupPhotoURL:newURL}));
            }
            console.log("GroupCard changePicture: No file selected");

        } catch(e) {
            alert("Exception - changePicture : " + e.message)
        }
    }
    
    try {
        // console.log("GroupCard:", group);
        // console.log("editMode:", editMode);
        // console.log("isNew:", isNew);

        if (!editMode && !isNew) {   // View
           
            return (
                <div className="p-5 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative" >
                        <span> <img className="rounded-t-lg w-12 h-12" src={group.groupPhotoURL} alt={group.groupName} /> </span>
                        <span className="absolute top-0 right-0 px-2 bg-orange-500 bg-opacity-90 text-white rounded" onClick={handleEditGroup}>Edit</span>
                        <span className="absolute top-0 right-20 px-2 bg-orange-500 bg-opacity-90 text-white rounded" onClick={handleGroupDetails}>Details</span>
                    </div>

                    <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group ID: <span className="text-gray-100 dark:text-lime-300">{group.groupID}</span></p>
                    <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Name: <span className="text-gray-100 dark:text-lime-300">{group.groupName}</span></p>
                    <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Country: <span className="text-gray-100 dark:text-lime-300">{group.groupCountry}</span></p>
                    <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> City: <span className="text-gray-100 dark:text-lime-300">{group.groupCity}</span></p>
                    <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group Levels: <span className="text-gray-100 dark:text-lime-300">{group.groupLevelOfPlay.toString()}</span></p>
                    <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group Info: <span className="text-gray-100 dark:text-lime-300">{group.groupInfo}</span></p>
                    {group.members.length? <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Number of Members: <span className="text-gray-100 dark:text-lime-300">{group.members.length}</span></p> 
                                        : ""}
                    {group.events.length? <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Number of Events: <span className="text-gray-100 dark:text-lime-300">{group.events.length}</span></p>
                                        : ""}

                </div>
            )
        } else {
            return (
                <form className="p-5 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative" >
                        <img className="rounded-t-lg w-24 h-24" src={group.groupPhotoURL} alt={group.groupName} />
                        <input type="file" accept="image/*" onChange={changePicture} />
                    </div>
                    <div>
                        <label htmlFor="groupName" className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="groupName" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.groupName} required 
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="groupCountry" className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">Country</label>
                        <select name="groupCountry" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.groupCountry} required 
                            onChange={handleChange}>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Philippines">Philippines</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="groupCity" className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">City</label>
                        <input type="text" name="groupCity" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.groupCity} required 
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="groupLevelOfPlay" className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">Group Levels
                            <div className="border border-gray-300 bg-gray-800 dark:bg-gray-700 rounded-lg py-2 px-2 w-10/12">
                                <LevelCard levelOfPlay={group.groupLevelOfPlay} newLevelOfPlay={(result)=>{
                                    setGroup(values=>({...values, groupLevelOfPlay:result}
                                    ));
                                }}>
                                </LevelCard>
                            </div>
                        </label>
                    <div>
                        <label htmlFor="groupInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Info</label>
                        <textarea name="groupInfo" rows="4" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.groupInfo} required 
                        onChange={handleChange}/>
                    </div>

                    {isNew? 
                        <div> 
                            <button onClick={(e)=>{saveGroup(e);setEditMode(false)}} className="px-10 bg-green-500 text-white rounded-full">Save</button>
                        </div>
                
                    :
                        <div> 
                            <button onClick={(e)=>saveGroup(e)} className="px-10 bg-green-500 text-white rounded-full">Save</button>
                            <button type="button" onClick={()=>{setEditMode(false)}} className="px-10 bg-gray-500 text-white rounded-full">OK</button>
                        </div>
                        
                    }

                    </div>
                </form>
            )
        }     
    } catch (e){
        alert ("Exception - GroupCard: " + e.message);
    }
}
