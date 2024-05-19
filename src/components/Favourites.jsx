import React, { useEffect, useState } from "react";
import { collection, getDoc,doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const Favourites = () => {
  const [favTeam, setFavteam] = useState()
  const user = auth.currentUser
  
  useEffect(() => {
    const getData = async () => {
      console.log(user.uid);
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().favourites.leagues);
      setFavteam(docSnap.data().favourites.leagues)
      console.log(favTeam);
      // const querySnapshot = await getDocs(collection(db, "users"));
      // console.log(querySnapshot.query);
    };
    
    getData()
  },[])

  return <div>
    <button  className=" text-white">
        Get data
    </button>
    <div>
      
      { favTeam?.map(fav => (
        
        <div>{fav.team}</div>
      ))}
    </div>
    
  </div>;
};

export default Favourites;
