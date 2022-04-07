import Joi from "joi-browser";
import { useState, useEffect, useContext } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../components/common/Input";
import UserContext from "../context/UserContext";
import { useRouter } from "next/router";

const Login = () => {
  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user]);

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
      setErrors({ login: "Login error! Wrong email or password" });
    }
  };
  return (
    <div className="md:w-5/6 mx-auto flex items-center h-screen">
      <form className="formInput" onSubmit={handleLogin}>
        <Input
          errors={errors}
          name="email"
          type="text"
          placeholder="Enter email address..."
        />
        <Input
          errors={errors}
          name="password"
          type="password"
          placeholder="Enter password..."
        />

        {errors.login && <p className="text-red-300 mb-2">{errors.login}</p>}
        <button className="w-full rounded bg-green-400 mx-auto text-white py-2 px-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
