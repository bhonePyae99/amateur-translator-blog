import {
  faBookOpenReader,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const mobileLogin = {
  hidden: { y: -300, opacity: 0 },
  visible: {
    y: 165,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5 },
  },
  exit: { y: -300, transition: { ease: "easeOut", duration: 0.5 } },
};

const mobileNotLogin = {
  hidden: { y: -300, opacity: 0 },
  visible: {
    y: 165,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5 },
  },
  exit: { y: -300, transition: { ease: "easeOut", duration: 0.5 } },
};

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="border-b-2 bg-green-500 text-white relative w-full">
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

          {!user && (
            <Link href="/signUp" passHref>
              <li className="cursor-pointer hover:border-b-2  border-b-transparent border-b-2">
                Register
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
          <FontAwesomeIcon
            icon={showMobileMenu ? faXmark : faBars}
            className="text-2xl"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
        </div>
      </div>
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="bg-green-600 z-10 w-full absolute bottom-0 translate-y-full"
            variants={user ? mobileLogin : mobileNotLogin}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="list-none text-center">
              <li
                className="border-b p-2"
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Books
              </li>
              <li
                className="border-b p-2"
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Authors
              </li>
              {!user && (
                <Link href="/login" passHref>
                  <li
                    className="border-b p-2"
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                  >
                    Login
                  </li>
                </Link>
              )}

              {!user && (
                <Link href="/signUp" passHref>
                  <li
                    className="border-b p-2"
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                  >
                    Register
                  </li>
                </Link>
              )}

              {user && (
                <Link href="/addBook" passHref>
                  <li
                    className="border-b p-2"
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                  >
                    Add Book
                  </li>
                </Link>
              )}
              {user && (
                <Link href="/profile" passHref>
                  <li
                    className="border-b p-2"
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                  >
                    Profile
                  </li>
                </Link>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
