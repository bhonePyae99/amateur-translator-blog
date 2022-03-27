import { faBookOpenReader, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { auth } from "../firebase-config";
const Navbar = () => {
  const { user } = useContext(UserContext);

  const logOutUser = async () => {
    await signOut(auth);
  };

  return (
    <nav className="border-b-2 bg-green-500 text-white">
      <div className="w-5/6 mx-auto py-4 flex justify-between items-center">
        <h1 className="md:text-3xl text-xl font-bold cursor-pointer">
          <Link href="/">
            <a>
              Amateur Translator{" "}
              <FontAwesomeIcon
                icon={faBookOpenReader}
                className="text-blue-200"
              />{" "}
            </a>
          </Link>
        </h1>
        <ul className="list-none md:flex font-bold text-gray-100 hidden justify-between w-1/3">
          <li className="cursor-pointer hover:border-b-2  border-b-transparent border-b-2">
            Books
          </li>
          {user && (
            <Link href="/addBook">
              <a>
                <li className="cursor-pointer hover:border-b-2  border-b-transparent border-b-2">
                  Add a Book
                </li>
              </a>
            </Link>
          )}
          <Link href="/authors">
            <a>
              <li className="cursor-pointer hover:border-b-2  border-b-transparent border-b-2">
                Authors
              </li>
            </a>
          </Link>
          {!user && (
            <Link href="/login" passHref>
              <li className="cursor-pointer hover:border-b-2  border-b-transparent border-b-2">
                Login
              </li>
            </Link>
          )}
          {user && (
            <Link href="/profile">
              <a>
                <li className="cursor-pointer hover:border-b-2  border-b-transparent border-b-2">
                  Profile
                </li>
              </a>
            </Link>
          )}
        </ul>
        {/* Mobile menu */}
        <div className="block md:hidden">
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
