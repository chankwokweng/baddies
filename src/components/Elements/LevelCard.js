import { useState, useEffect } from "react";
import { constLevelOfPlayList } from "../../constants";


export const LevelCard = ({levelOfPlay, newLevelOfPlay}) => {
    // console.log(levelOfPlay);
    const [levelArray, setLevelArray] = useState(levelStringToArray(levelOfPlay));

    // console.log(levelArray); 
    // console.log(newLevelOfPlay);
    // levelStringToArray(levels);


    function levelArrayToString (a) { 
        // console.log("levelArrayToString:",a);            //example "HB;HI"

                let s=""; 
                a.map( (e,index) => {
                    if (e) {
                                s.length>0? 
                                    s=s+";"+constLevelOfPlayList[index].value
                                    :s=constLevelOfPlayList[index].value};
                    return true});
                // console.log("levelArrayToString:",s);
                return s };

    function levelStringToArray (s) {
        // console.log(s);
        const r = constLevelOfPlayList.map((l,index)=>{return s.indexOf(l.value)>-1?true:false;});
        // console.log(r);
        return(r);
    } 
    function onChange(e,index) { 
        // const options = [...e.target.selectedOptions];
        // const levels = options.map(option => option.value);
        // console.log("on change");
        // console.log(e);
        const newLevelArray = levelArray.map( (l,i) => {
            // console.log(i,index,l)
            if (i == index) {
                return e.target.checked;
            } else {
                return l;
            }
        }); 
        // console.log(newLevelArray);
        setLevelArray(newLevelArray);
        // console.log(levelArray);
        newLevelOfPlay(levelArrayToString(newLevelArray));
    }
  return (
    <div> 
        {
            constLevelOfPlayList.map( (l,index) => (
                <>
                    <label className="text-sm text-gray-900 dark:text-white" key={index}>  
                        <input type="checkbox" checked={levelArray[index]} name={l.value} key={l.value}
                            onChange={(e)=> onChange(e,index)}/>
                                {l.value} - {l.desc}
                    </label>
                    <br></br>
                </>
            ))}
    </div>
  )
}
