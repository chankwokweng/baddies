import { useState, useEffect } from "react";
import { dataServiceUploadFile,dataServiceSaveGroup } from "../../services/dataService";

export const GroupCard = ({Group:_group, Mode:mode}) => {
    // Mode = "New", "View", "Edit" 
    const [editMode,setEditMode] = useState(false);  
    const ugroupID = JSON.parse(sessionStorage.getItem("uid"));
    let isNew = false;
    let isEdit = false;
    const [group, setGroup] = useState({ groupID:"",  groupName:"", groupInfo:"", groupLevelOfPlay:"", members:[],
    groupPhotoURL:"https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3"});
    
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
    async function saveGroup(){
        // console.log ("SaveGroup");
        // console.log (group);
        // console.log(profile);
        // console.log("submit");
        await dataServiceSaveGroup(ugroupID, group);        // if groupID is blank, it is a new group
    }
    
    async function changePicture(fileObject) {
        try {
            let newURL = await dataServiceUploadFile(group.groupID, "groups", fileObject);
        } catch(e) {
            alert("Exception - changePicture : " + e.message)
        }
    }
    
    if (mode==="Edit") {isEdit=true;isNew=false}
        else if (mode==="New") {isEdit=true;isNew=true};

    // console.log("new,edit = ", isNew, isEdit);
    // console.log( _group);

    useEffect( () => {
        if (!isNew) {
            setGroup( _group);
        } else {
            setGroup({ groupID:"",  groupName:"", groupInfo:"", groupLevelOfPlay:"", members:[{id:"1"},{id:"2"}],
                groupPhotoURL:"https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3"});
        }
        if (mode==="New") setEditMode(true);
    },[mode,_group]);

    try {

        if (!editMode) {
    // console.log("Rendering read-only - editMode=", editMode, ":", mode);  
    // console.log( group);

            return (
                <div className="p-5 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative" >
                        <img className="rounded-t-lg w-12 h-12" src={group.groupPhotoURL} alt={group.groupName} />
                        <span className="absolute top-0 right-0 px-2 bg-orange-500 bg-opacity-90 text-white rounded" onClick={handleEditGroup}>Edit</span>
                    </div>

                    <p className="mt-1 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Name: <span className="text-gray-100 dark:text-lime-300">{group.groupName}</span></p>
                    <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group Levels: <span className="text-gray-100 dark:text-lime-300">{group.groupLevelOfPlay}</span></p>
                    <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Group Info: <span className="text-gray-100 dark:text-lime-300">{group.groupInfo}</span></p>
                    <p className="mt-0 mb-0 block text-sm font-medium text-gray-900 dark:text-white"> Number of Members: <span className="text-gray-100 dark:text-lime-300">{group.members.length}</span></p>

                </div>
            )
        } else {
    // console.log("Rendering with edit - editMode=", editMode, ":", mode);  
    // console.log( group);

            return (
                <div className="p-5 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
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
                        <label htmlFor="groupLevelOfPlay" className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">Group Levels</label>
                        <input type="text" name="groupLevelOfPlay" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.groupLevelOfPlay} required 
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="groupInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Info</label>
                        <textarea name="groupInfo" rows="4" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.groupInfo} required 
                        onChange={handleChange}/>
                    </div>

                    {isNew? "":
                        <div> 
                            <span className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">Number of Members </span>
                            <span className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> {group.members.length} </span>
                        </div>
                    }

                    <button onClick={()=>saveGroup()} className="px-10 bg-green-500 text-white rounded-full">Save</button>
                    <button type="button" onClick={()=>{setEditMode(false)}} className="px-10 bg-gray-500 text-white rounded-full">OK</button>
                </div>
            )
        }     
    } catch (e){
        alert ("Exception - GroupCard: " + e.message);
    }
}
