import { useState, useContext, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Joi from "joi-browser";

import { auth, storage } from "../firebase-config";
import Input from "../components/common/Input";
import UserContext from "../context/UserContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState("");
  const router = useRouter();
  const { user } = useContext(UserContext);

  //redirect to profile page if already signIn
  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user]);

  //validate function
  const validateData = (data) => {
    const schema = {
      username: Joi.string().required().label("Username"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
      confirmpassword: Joi.string().required().label("Confirm Password"),
    };
    const errors = Joi.validate(data, schema, { abortEarly: false });
    if (errors.error === null) return null;

    return errors.error.details;
  };

  //upload Profile Image to cloud storage function
  const updateUserInformation = (image, name) => {
    const referce = ref(storage, `profileImages/${image.name}`);
    const uploadTask = uploadBytesResumable(referce, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        //handle error
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: downloadUrl,
        });
        router.replace("/profile");
      }
    );
  };

  //handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmpassword: e.target.confirmpassword.value,
    };
    const errors = validateData(registerData);
    if (errors !== null) {
      let err = {};
      for (let item of errors) {
        err[item.path[0]] = item.message;
      }
      setErrors(err);
      return;
    } else if (e.target.password.value !== e.target.confirmpassword.value) {
      let err = {};
      err.confirmpassword = "Password did not match!";
      setErrors(err);
      return;
    } else if (profilePic === "") {
      let err = {};
      err.profilePic = "Required profile picture!";
      setErrors(err);
      return;
    }
    setErrors({});
    try {
      await createUserWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      );
      updateUserInformation(profilePic, e.target.username.value);
    } catch (ex) {
      let err = {};
      err.register = "Unable to register!";
      setErrors(err);
    }
  };

  const handleProfileUpload = (e) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="md:w-5/6 mx-auto py-10">
      <form className="formInput relative" onSubmit={handleRegister}>
        <div className="w-full flex flex-col items-center mb-8">
          {errors.profilePic && (
            <p className="text-red-300 mb-2">{errors.profilePic}</p>
          )}
          <img
            src={preview !== "" ? preview : "/default-profile.jpg"}
            className="w-28 h-28 border-4 border-green-500 rounded-full"
          />
          <label
            htmlFor="profilePic"
            className="px-1 py-1 bg-blue-400 rounded text-white cursor-pointer mt-4"
          >
            Choose Profile
          </label>
          <input
            type="file"
            id="profilePic"
            onChange={handleProfileUpload}
            hidden
          />
        </div>

        <Input
          name="username"
          type="text"
          placeholder="Enter username..."
          errors={errors}
        />
        <Input
          name="email"
          type="email"
          placeholder="Enter Email Address..."
          errors={errors}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password..."
          errors={errors}
        />
        <Input
          name="confirm password"
          type="password"
          placeholder="Confirm password..."
          errors={errors}
        />

        {errors.register && (
          <p className="text-red-300 mb-2">{errors.register}</p>
        )}

        <button className="w-full rounded bg-green-400 mx-auto text-white py-2 px-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
