import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Favourites = () => {
  const getData = async () => {
    
    const snapShot = await getDocs(collection(db,'users'))
    snapShot.forEach((doc) => {
        console.log({id: doc.id, ...doc.data()});
    })
    // const querySnapshot = await getDocs(collection(db, "users"));
    // console.log(querySnapshot.query);
  };

  return <div>
    <button onClick={getData} className=" text-white">
        Get data
        {}
    </button>
    
  </div>;
};

export default Favourites;
