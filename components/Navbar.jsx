import { faBookOpenReader, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
const Navbar = () => {
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
        <ul className="list-none md:flex hidden justify-between w-1/5">
          <li className="cursor-pointer hover:border-b-2 hover:border-b-red-500 border-b-transparent border-b-2">
            Books Lists
          </li>
          <Link href="/addBook">
            <a>
              <li className="cursor-pointer hover:border-b-2 hover:border-b-red-500 border-b-transparent border-b-2">
                Add a book
              </li>
            </a>
          </Link>
          <li className="cursor-pointer hover:border-b-2 hover:border-b-red-500 border-b-transparent border-b-2">
            Login
          </li>
        </ul>
        {/* Mobile menu */}
        <div className="hidden md:hidden">
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
