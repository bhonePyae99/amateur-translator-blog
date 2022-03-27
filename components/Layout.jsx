import Navbar from "./Navbar";
import UserContext from "../context/UserContext";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const Layout = ({ children }) => {
  const [user] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user }}>
      <Navbar />
      {children}
    </UserContext.Provider>
  );
};

export default Layout;
