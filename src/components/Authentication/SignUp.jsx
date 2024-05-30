import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const user = auth.currentUser;

  const signUp = async () => {
    setError("");
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setEmail("");
        setPassword("");
        navigate("/");
        setDoc(doc(db, "users", `${user.uid}`), {
          // name: user.displayName ? user.displayName : "",
          // email: user.email,
          // user_id: user.uid,
          // profile_img_url: user.photoURL ? user.photoURL : "",
          favouritesTeams: 
            { 
              teams: {}
            },
        })
          .then((data) => {
            console.log("details uploaded");
          })
          .catch((err) => {
            console.log(err, "error uploading data");
          });
      })
      .catch((err) => {
        const message = err.message;
        setError(message);
        console.error(message);
      });
  };
  return (
    <div className="flex justify-center items-center w-full mt-4 h-[100%]">
      <div className="bg-customBg2 rounded-xl flex flex-col items-center text-customBg  justify-center md:w-[450px] gap-4 pb-32 pt-20 h w-[95%]">
        <div className=" mb-10">
          <h1 className=" text-4xl text-lightText">Sign Up</h1>
        </div>
        <div className="flex flex-col gap-2 mb-3 w-[85%]">
          <label htmlFor="" className=" text-lightText opacity-90 text-xs">
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            value={email}
            placeholder="Enter your email"
            className=" bg-transparent outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 px-3 py-2 rounded-md transition-colors duration-200 text-gray-300"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3 w-[85%]">
          <label htmlFor="" className=" text-lightText opacity-90 text-xs">
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Enter your password"
            className=" bg-transparent outline-none border border-solid border-opacity-20 border-customBg focus:border-opacity-100 px-3 py-2 rounded-md transition-colors duration-200 text-gray-300"
          />
        </div>
        {error && (
          <div className=" text-red-500">
            {error === "Firebase: Error (auth/email-already-in-use)."
              ? `${email} already exist`
              : error ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
              ? "Password should be atleast 6 characters"
              : error === "Firebase: Error (auth/invalid-email)."
              ? `${email} is not a valid email address`
              : error === "Firebase: Error (auth/missing-password)."
              ? "Input password"
              : error === "Firebase: Error (auth/missing-email)."
              ? "Input email"
              : error}
          </div>
        )}
        <button
          onClick={signUp}
          className={` text-white bg-customBg w-[85%] rounded-md py-2 text-base bg-opacity-90 hover:bg-opacity-100 transition-colors duration-100 mt-7`}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;
