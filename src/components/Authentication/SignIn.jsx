import React, { useState } from "react";
// import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  console.log(auth?.currentUser?.displayName);
  const user = auth?.currentUser;

  const signInWithGoogle = async () => {
    setError("");

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          favouritesTeams: {
            teams: {},
          },

          // name: user.displayName ? user.displayName : "",
          // email: user.email,
          // user_id: user.uid,
          // profile_img_url: user.photoURL ? user.photoURL : ""
        });
        console.log("details uploaded");
      }

      // Navigate to home or another page
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };
  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const resetPassword = async () => {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert("Email sent! check your inbox for password reset instruction");
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <div className="flex flex-col justify-center items-center mt-4 px-2">

    <div className=" bg-customBg2 w-full ">
      <div className=" ">
        <h1 className=" text-4xl py-8 text-lightText text-center">Sign In</h1>
      </div>
      {/* <div className="md:flex flex-col rounded-xl overflow-hidden w-full"> */}
      {/* <img
          src="src\assets\Fjordcup.jpeg"
          alt=""
          className={`md:h-fit md:w-1/2 w-full scale-y-110 md:block hidden`}
        /> */}
      <div className="  rounded-xl flex flex-col items-center text-customBg py-12  justify-center md:w-[450px] gap-10 w-[95%] ">
        <div className="flex flex-col w-[85%] ">
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="" className=" text-gray-400 opacity-60 text-xs">
              Email
            </label>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-transparent outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 px-3 py-2 rounded-md transition-colors duration-200 text-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className=" text-gray-400 opacity-60 text-xs ">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-transparent outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 px-3 py-2 rounded-md transition-colors duration-200 text-gray-300"
            />
            <div
              onClick={resetPassword}
              className=" text-right underline cursor-pointer"
            >
              forgot password?
            </div>
          </div>
          {error && <div className=" text-red-400">{error}</div>}
          <button
            onClick={signIn}
            className={` text-white bg-customBg w-full rounded-md py-1 text-base bg-opacity-90 hover:bg-opacity-100 transition-colors duration-100 mt-7`}
          >
            Sign In
          </button>
          <div className="flex justify-center items-center my-4">
            <div className=" bg-customBg opacity-40 w-20 h-[1px]"></div>
            <div className=" px-4 text-white">or</div>
            <div className=" bg-customBg opacity-40 w-20 h-[1px]"></div>
          </div>
          <button
            onClick={signInWithGoogle}
            className="flex gap-3 items-center justify-center hover:bg-darkCustomBg3 hover:bg-opacity-50 rounded-md transition-colors duration-200 py-2 mb-2 border border-solid border-gray-300 border-opacity-20"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png?20230822192911"
              className=" h-5"
            />
            <div className=" text-gray-200 text-xs">Sign in with google</div>
          </button>
          <div className=" flex justify-center text-gray-300 mt-3">
            Are you new?{" "}
            <Link to={`/signup`} className=" underline" onClick={logOut}>
              Create Account
            </Link>
          </div>
          {/* <button onClick={logOut}>Log Out</button> */}
        </div>
      </div>
      {/* </div> */}
    </div>
    </div>
  );
};

export default SignIn;
