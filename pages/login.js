import Joi from "joi-browser";
import { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [errors, setErrors] = useState({});

  //validate function
  const validateData = (data) => {
    const schema = {
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    };
    const errors = Joi.validate(data, schema, { abortEarly: false });
    if (errors.error === null) return null;

    return errors.error.details;
  };

  //login user
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const errors = validateData(loginData);
    if (errors !== null) {
      let err = {};
      for (let item of errors) {
        err[item.path[0]] = item.message;
      }
      setErrors(err);
      return;
    }
    setErrors({});
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      window.location.pathname = "/";
    } catch (ex) {
      console.log(ex.code);
      setErrors({ login: "Login error! Wrong email or password" });
    }
  };
  return (
    <div className="md:w-5/6 mx-auto flex items-center h-screen">
      <form
        className="flex flex-col w-5/6 md:w-1/2 mx-auto border-2 p-5"
        onSubmit={handleLogin}
      >
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          className={
            errors.email
              ? "outline-none p-2 border-2 border-red-400 focus:border-blue-400 rounded mt-3"
              : "outline-none p-2 border-2 focus:border-blue-400 rounded mt-3"
          }
          id="email"
          name="email"
          placeholder="Enter email address..."
        />
        <small className="mb-2 mt-1 text-red-300">
          {errors.email && errors.email}
        </small>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          className={
            errors.password
              ? "outline-none p-2 border-2 focus:border-blue-400 rounded mt-3 border-red-400"
              : "outline-none p-2 border-2 focus:border-blue-400 rounded mt-3"
          }
          id="password"
          placeholder="Enter password..."
        />
        <small className="mb-2 mt-1 text-red-300">
          {errors.password && errors.password}
        </small>

        {errors.login && <p className="text-red-300 mb-2">{errors.login}</p>}
        <button className="w-full rounded bg-green-400 mx-auto text-white py-2 px-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
