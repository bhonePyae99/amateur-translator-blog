import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("Anonymous Author");

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    }
  }, [user]);

  const changeNameToDatabase = async (e) => {
    e.preventDefault();
    console.log(userName);
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    setEditProfile(false);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div className="w-5/6 mx-auto py-10">
      <button
        className="py-1 px-2 text-white bg-red-400 float-right rounded"
        onClick={() => {
          const signOutUser = async () => {
            await signOut(auth);
            window.location.pathname = "/";
          };
          signOutUser();
        }}
      >
        Logout
      </button>
      <div className="flex flex-col items-center md:items-start">
        <img
          src={
            (user && user.photoURL) ||
            "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
          }
          className="w-[100px] h-[100px] rounded-full"
          alt=""
        />
        <div className="flex items-center mt-3">
          <form className="flex">
            <input
              value={userName}
              name="username"
              className={
                editProfile
                  ? "text-lg text-black rounded text-center md:text-left py-1 px-3 outline-none border-2 border-blue-400 font-bold"
                  : "text-lg text-gray-400 text-center md:text-left outline-none font-bold"
              }
              readOnly={!editProfile}
              onChange={handleNameChange}
            />
          </form>
          {editProfile ? (
            <button
              className="py-2 px-1 bg-blue-500 rounded text-white"
              onClick={changeNameToDatabase}
            >
              Set
            </button>
          ) : (
            <FontAwesomeIcon
              icon={faPen}
              className="cursor-pointer"
              onClick={() => {
                setEditProfile(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
