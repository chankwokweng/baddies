import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { ProfileCard } from "../../components"
import { dataServiceGetProfile, dataServiceSaveProfile, dataServiceUploadFile } from "../../services/dataService";
import { useTitle } from "../../hooks/useTitle";
import { constLevelOfPlayList } from "../../constants";

export const ProfilePage = () => {
  useTitle("Profile");

  const _profile=
        {id: "", 
        userName:"", 
        userEmail:"", 
        userPhoneNumber: "", 
        // userPhotoURL: "https://www.theloadout.com/wp-content/sites/theloadout/2022/01/Rainbow-Six-Extraction-Lion-Trio-Operators.jpeg",
        userPhotoURL: "https://lh3.googleusercontent.com/ogw/AOLn63EjR9wXLLtR83UQDesIfjPZlKM4W4w9smj-SyY7lQ=s32-c-mo",
        userGender : "",
        userMyInfo: "",
        userLevelOfPlay : "", 
        userLevelOfPlayThumbUp : 0, 
        userLevelOfPlayThumbSide : 0,
        userLevelOfPlayThumbDown : 0,
        memberOf : [
        ]
      };
      // console.log("ProfilePage ...1");

    const uid = JSON.parse(sessionStorage.getItem("uid"));
    async function getProfile() {
      // console.log("getProfile ...1");

      return await dataServiceGetProfile(uid);
    }
 
    const [profile, setProfile] = useState(_profile); 
    const navigate = useNavigate();
    useEffect( ()=> {
      async function _getProfile(){
        getProfile().then((p)=>
        {
          // console.log("getProfile ...2");
          // console.log(p);
          if (p) {
            if (!p.userLevelOfPlay) p.userLevelOfPlay = "UN"; 
            if (!p.userLevelOfPlayThumbUp) p.userLevelOfPlayThumbUp = 0; 
            if (!p.userLevelOfPlayThumbSide) p.userLevelOfPlayThumbSide = 0; 
            if (!p.userLevelOfPlayThumbDown) p.userLevelOfPlayThumbDown = 0; 
            if (!p.userPhoneNumber) p.userPhoneNumber = "";
            if (!p.userPhotoURL) p.userPhotoURL= "https://firebasestorage.googleapis.com/v0/b/social-baddies.appspot.com/o/defaultProfilePic.jpg?alt=media&token=3e36afaa-3882-44a3-b4c4-e9d41476dce3";
            if (!p.userGender) p.userGender = "X";
            if (!p.userMyInfo) p.userMyInfo = "";
            if (!p.memberOf) p.memberOf = "";

            setProfile(p);
          }
        })
      }
      _getProfile();
    },[uid]);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      // console.log("name:value", name, ':', value);

      setProfile(values => ({...values, [name]: value}))
      // console.log("handleChange");
      // console.log(profile);
    }

  async function saveToDB(e) {
    e.preventDefault();
    // console.log(profile);
    // console.log("submit");
    await dataServiceSaveProfile(profile);
  }

  async function changePicture(fileObject) {
    // console.log("changePicture: ");
    // console.log(fileObject);
    try {
      let newURL = await dataServiceUploadFile(uid, "profiles", fileObject);
        // console.log("changePicture: 2");
        // console.log(newURL);
        setProfile( {...profile, userPhotoURL:newURL});
        // console.log(profile);
    
      } catch(e) {
        alert("Exception - changePicture : " + e.message)
    }
  }
  function closeProfilePage(e) {
    e.preventDefault();
    navigate("/"); }

  return (
    <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ml-2">
      <form className="ml-2" onSubmit={saveToDB}>
      <div className="relative h-100 w-100" >
          <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">My Info</span>
          <img className="rounded-full max-h-20 mx-auto" src={profile.userPhotoURL} alt={profile.userName} />
          <input type="file" accept="image/*" onChange={changePicture} />
      </div>

        {/* <div className="relative z-0 w-full ml-2 mb-6 group"> */}
          <div>
              <label htmlFor="userName" className="mt-6 mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="userName" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profile.userName} required 
               onChange={handleChange}/>
          </div>
          <div>
              <label htmlFor="userEmail" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" name="userEmail" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profile.userEmail} readOnly />
          </div>
          <div>
              <label htmlFor="userPhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <input type="text" name="userPhoneNumber" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profile.userPhoneNumber} required 
               onChange={handleChange}/>
          </div>
          <div>
              <label htmlFor="userGender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">My Gender</label>
              <select type="text" name="userGender" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profile.userGender} required
               onChange={handleChange}>
                <option> Select your gender </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="X">Prefer to keep private</option>
              </select>      
          </div>
          <div>
              <label htmlFor="userLevelOfPlay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">My level of play
                <span className="columns-3 px-10 space-x-1 ">
                  <i className="px-2 mb-2 bi bi-emoji-smile bg-green-500 rounded"> {profile.userLevelOfPlayThumbUp} </i>
                  <i className="px-2 mb-2 bi bi-emoji-expressionless bg-gray-500 rounded">{profile.userLevelOfPlayThumbSide} </i>
                  <i className="px-2 mb-2 bi bi-emoji-frown bg-red-500 rounded">{profile.userLevelOfPlayThumbDown} </i>
                </span>
              </label>

              <select type="text" name="userLevelOfPlay" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profile.userLevelOfPlay} required
               onChange={handleChange}>
                { constLevelOfPlayList.map( (l)=>
                    <option key={l.value} value={l.value}>{l.desc}</option> 
                )}
              </select>      
            </div>
            <div>
              <label htmlFor="userMyInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">My Info</label>
              <textarea name="userMyInfo" rows="4" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profile.userMyInfo} required 
               onChange={handleChange}/>
          </div>
      {/* </div> */}
        <button className="px-10 bg-green-500 text-white rounded-full">Save</button>
        <button type="button" onClick={closeProfilePage} className="px-10 bg-gray-500 text-white rounded-full">OK</button>

      </form>
    </div>
  )
}
