// import { initializeApp } from "firebase/app";
import { collection, getDocs, setDoc, getDoc, doc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { toast } from 'react-toastify';
// import { authServiceGetCurrentUser } from "./";

function getSession(){
    const uid = JSON.parse(sessionStorage.getItem("uid"));
    return {uid};
}

//---------------- FILES
function generateHexString(length) {
    // Use crypto.getRandomValues if available
    if (
      typeof crypto !== 'undefined' 
      && typeof crypto.getRandomValues === 'function'
    ) {
      var tmp = new Uint8Array(Math.max((~~length)/2));
      crypto.getRandomValues(tmp);
      return Array.from(tmp)
        .map(n => ('0'+n.toString(16)).substr(-2))
        .join('')
        .substr(0,length);
    }
  
    // fallback to Math.getRandomValues
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
  }

export async function dataServiceUploadFile(id, folder, fileObject){
    // console.log ("dataServiceUploadFile : ");
    // console.log (fileObject);
    try {
        let myPromise = new Promise(function(resolve) {

        let metadata = {
            contentType: 'image/jpeg',
          };

        if (id==="") 
            id = generateHexString(20);
        // console.log ("dataServiceUploadFile : 1");
        // console.log (fileObject.target.files);
        let filename = fileObject.target.files[0].name;
        if (filename.indexOf(".jpg")) {
            filename = folder+"/"+id+".jpg";
            metadata.contentType =  'image/jpg';
        } else if (filename.indexOf(".jpeg")) {
            filename = folder+"/"+id+".jpeg";
        } else if (filename.indexOf(".png")) {
            filename = folder+"/"+id+".png";
            metadata.contentType =  'image/png';
        }
    
        const storageRef = ref(storage, filename);
        // console.log ("dataServiceUploadFile : 2a - " + filename);
        // console.log ("dataServiceUploadFile : 2b - " + storageRef);
        uploadBytes(storageRef, fileObject.target.files[0], metadata)
        .then((snapshot) => {
            // console.log('Uploaded a blob or file! - ');
            // console.log('Getting newURL ');
            getDownloadURL(ref(storage, filename)).then ( (newURL) => {
                // console.log ("dataServiceUploadFile : 2c - " + newURL);
                resolve(newURL);
            });
        });
        })
        return (await myPromise);
    } catch (e) {
        alert ("Exception: dataServiceUploadFile -" + e.message);
        return("");
    }
}

//---------------- GROUPS

export async function dataServiceGetGroups(uid){
// console.log("getUsers");

    const groups = query(collection(db, "Groups"), where("groupOwnerID", "==", uid));
    const querySnapShot = await getDocs(groups);
    let result =[];
    querySnapShot.forEach(document => {
            // console.log(document.data());
            result.push(document.data());
    });
    return result;
}

export async function dataServiceSaveGroup(uid, group){
    // console.log("dataService_saveProfile");
    // console.log(profile);
    
    try {
        if (!group.groupID) {                        //new group
            group.groupID = generateHexString(20);
            group.groupOwnerID = uid;
        }
        // console.log(group);
        const docRef = doc(db, "Groups", group.groupID);
        await setDoc(docRef, group); 
        toast("Group Saved!!!");
        return true;
    } catch (e) {
        alert("Error during save group:" + e.message);
        return false;
    }
}

export async function dataServiceGetGroup(groupID){
    console.log("dataServiceGetGroup : ", groupID);
    
    try {
        const docRef = doc(db, "Groups", groupID);
        await getDoc(docRef).then(
           (snap) => {
                console.log("dataServiceGetGroup Data:");
                console.log(snap.exists());
                console.log(snap.data());
                return(snap.data());
           }
        ); 
        return null;
    } catch (e) {
        alert("Error during get group:" + e.message);
        return null;
    }
}

//---------------- USERS

export async function dataServiceGetUserSession(){
    const browserData = getSession();
    return (browserData);
}


export async function dataServiceGetUsers(){
// console.log("getUsers");

    const userRef = collection(db, "Users");
    getDocs(userRef).then(data => 
    {
        data.docs.forEach(document => {
            console.log(document.id);
        })
    }) 
}
export async function dataServiceRegisterUser(uid, email){
// console.log("registerUser");
// console.log(uid, email);
    try {
        // console.log("registerUser-1");
        // const docRef = doc(db, "Users", uid);
        // console.log("registerUser-2");

        await setDoc(doc(db, "Users", uid), {
            uid: uid,
            userEmail: email
        })     
    } catch (e) {
        alert ("Exception: dataServiceRegisterUser -" + e.message);
    }
}

export async function dataServiceGetProfile(profileID){
    // console.log("dataServiceGetProfile");
    // console.log(profileID);
    
        try {
            const docRef = doc(db, "Users", profileID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data(); 
                // console.log("Document data:");
                // console.log(data); 
                return data;
            } else {
            // docSnap.data() will be undefined in this case
                console.log("dataServiceGetProfile-5 - No such document!");
                return null;
            };
        } catch (e) {
            alert("Error during get profile:" + e.message);
            return false;
        }
}
    
export async function dataServiceSaveProfile(profile){
// console.log("dataService_saveProfile");
// console.log(profile);

    try {
        const docRef = doc(db, "Users", profile.uid);
        await setDoc(docRef, profile); 
        toast("Profile Saved!!!");
        return true;
    } catch (e) {
        alert("Error during save profile:" + e.message);
        return false;
    }
}


// const qRef = query(colRef, where("category", "==", "drama"), orderBy("createdAt"));

// getDocs(colRef).then(data => {
//     data.docs.forEach(document => {
//         console.log(document.id);
//     })
// })

// getDocs(colRef)
//     .then(data => {
//         let movies = [];
//         data.docs.forEach(document => {
//             movies.push({...document.data(), id: document.id});
//         });
//         console.log(movies);
//     })
//     .catch(error => {
//         console.log(error);
//     });

    
//     const addForm = document.querySelector(".add");
//     addForm.addEventListener("submit", event => {
//         event.preventDefault();
//         addDoc(colRef, {
//             name: addForm.name.value,
//             category: addForm.category.value,
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp()
//         })
//         .then(() => {
//             addForm.reset();
//         });
//     });
    
    
//     const deleteForm = document.querySelector(".delete");
//     deleteForm.addEventListener("submit", event => {
//         event.preventDefault();
        
//         const documentReference = doc(db, "movies", deleteForm.id.value);
//         deleteDoc(documentReference)
//         .then(() => {
//                 deleteForm.reset();
//         });
//     });
    
    
//     const updateForm = document.querySelector(".update");
//     updateForm.addEventListener("submit", event => {
//         event.preventDefault();
    
//         const documentReference = doc(db, "movies", updateForm.id.value);
//         updateDoc(documentReference, {
//             name: updateForm.name.value,
//             updatedAt: serverTimestamp()
//         })
//         .then(() => {
//             updateForm.reset();
//         });
//     });

// onSnapshot(colRef, (data) => {
//     let movies = [];
//     data.docs.forEach(document => {
//         movies.push({...document.data(), id: document.id});
//     });
//     console.log(movies);
// });

