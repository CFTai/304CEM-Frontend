import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivatePage = ({Component}) => {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN")
  return token ? <Component /> : <Navigate to="/login" />
}

export default PrivatePage;