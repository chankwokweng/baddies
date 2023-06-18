export const currentUserReducer = (state, action) => {
    const { type, payload } = action;
console.log("currentUserReducer");
// console.log(type);
// console.log(payload);

    switch(type){

        case "LOGIN":
        case "LOGOUT":

            return {...state, uid: payload.uid, 
                                userName: payload.userName,
                                userEmail: payload.userEmail,
                                userPhoneNumber: payload.userPhoneNumber, 
                                userPhotoURL: payload.userPhotoURL, 
                                
                                }
            // return {...state}
        // case "LOGOUT":
        //     return {...state, name: payload.name, email: payload.email}

        default:
            throw new Error("No case found!"); 
    }
}