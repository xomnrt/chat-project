import { AuthContext } from "../../contexts/AuthProvider.jsx";
import { useContext } from "react";

const LogOutButton = () => {

    const authContext = useContext(AuthContext);

    return (
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={authContext.logOut}>Выйти</button>
    )
}

export default LogOutButton;
