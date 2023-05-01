// import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, addDoc, getDoc, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/config";
import { toast } from 'react-toastify';
import { authServiceGetCurrentUser } from "./";

function getSession(){
    const uid = JSON.parse(sessionStorage.getItem("uid"));
    return {uid};
}

//---------------- FILES

export async function dataServiceUploadFile(id, fileObject){
    // console.log ("dataServiceUploadFile : ");
    // console.log (fileObject);
    try {
        let metadata = {
            contentType: 'image/jpeg',
          };

        // console.log ("dataServiceUploadFile : 1");
        // console.log (fileObject.target.files);
        let filename = fileObject.target.files[0].name;
        if (filename.indexOf(".jpg")) {
            filename = "profiles/"+id+".jpg";
            metadata.contentType =  'image/jpg';
        } else if (filename.indexOf(".jpeg")) {
            filename = "profiles/"+id+".jpeg";
        } else if (filename.indexOf(".png")) {
            filename = "profiles/"+id+".png";
            metadata.contentType =  'image/png';
        }
    
        const storageRef = ref(storage, filename);
        console.log ("dataServiceUploadFile : 2a - " + filename);
        console.log ("dataServiceUploadFile : 2b - " + storageRef);
        uploadBytes(storageRef, fileObject.target.files[0], metadata)
        .then((snapshot) => {
            console.log('Uploaded a blob or file! - ');
        // }).then (() => {
            console.log('Getting newURL ');
            getDownloadURL(ref(storage, filename)).then ( (newURL) => {
             console.log ("dataServiceUploadFile : 2c - " + newURL);

                return(newURL);
        });

        });
        // console.log ("dataServiceUploadFile : 3");
        // return ("");

        // await setDoc(doc(db, "Users", uid), {
        //     uid: uid,
        //     userEmail: email
        // })     

    } catch (e) {
        alert ("Exception: dataServiceUploadFile -" + e.message);
        return ("");
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
// console.log(uid);
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
                // console.log("dataServiceGetProfile-5 - No such document!");
                return authServiceGetCurrentUser();
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

