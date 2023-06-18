
export const ProfileCard = ({profile}) => {

    const {id, userName, userEmail, userPhoneNumber, userPhotoURL,
                userLevelOfPlay, userLevelOfPlayThumsUp, userLevelOfPlayThumsDown,
                memberOf  } = profile;

    return (
        <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="relative" >
                { <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">My Info</span> }
                <img className="rounded-t-lg w-full h-64" src={userPhotoURL} alt={userName} />
            </div>
            <div className="p-5">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Name  : {userName}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Phone : {userPhoneNumber}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Email : {userEmail}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> My level of play: {userLevelOfPlay}</p>
                
            </div>
        </div>
  )
}
