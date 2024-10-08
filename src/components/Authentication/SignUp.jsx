import React, { useState } from "react";
import { auth, db, googleProvider } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

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
        sendEmailVerification(user).then(() => {
          alert("Email verification link sent");
        });
        console.log(user);
        setEmail("");
        setPassword("");
        navigate("/signin");
        // setDoc(doc(db, "users", `${user.uid}`), {
        //   // name: user.displayName ? user.displayName : "",
        //   // email: user.email,
        //   // user_id: user.uid,
        //   // profile_img_url: user.photoURL ? user.photoURL : "",
        //   favouritesTeams:
        //     {
        //       teams: {}
        //     },
        // })
        //   .then((data) => {
        //     console.log("details uploaded");
        //   })
        //   .catch((err) => {
        //     console.log(err, "error uploading data");
        //   });
      })
      .catch((err) => {
        const message = err.message;
        setError(message);
        console.error(message);
      });
  };
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
  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="bg-customBg2 rounded-xl flex flex-col items-center text-customBg  justify-center md:w-[450px] gap-2  h w-[95%]">
        <div className="">
          <h1 className=" text-4xl text-lightText py-8">Sign Up</h1>
        </div>
        <div className=" w-full flex flex-col items-center py-12">
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
          <div className="flex justify-center items-center my-4">
            <div className=" bg-customBg opacity-40 w-20 h-[1px]"></div>
            <div className=" px-4 text-white">or</div>
            <div className=" bg-customBg opacity-40 w-20 h-[1px]"></div>
          </div>
          <button
            onClick={signInWithGoogle}
            className="flex gap-3 items-center justify-center hover:bg-darkCustomBg3 hover:bg-opacity-50 rounded-md transition-colors duration-200 py-2 mb-2 border border-solid border-gray-300 border-opacity-20 w-[85%]"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png?20230822192911"
              className=" h-5"
            />
            <div className=" text-gray-200 text-xs">Sign in with google</div>
          </button>
          <div className=" flex justify-center text-gray-300 mt-3">
            Already have an account?{" "}
            <Link to={`/signin`} className=" underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
