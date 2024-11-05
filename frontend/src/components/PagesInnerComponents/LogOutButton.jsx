import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import { useContext } from "react";

const LogOutButton = () => {

    const {t} = useTranslation()

    const authContext = useContext(AuthContext);

    return (
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={authContext.logOut}>{t("logout")}</button>
    )
}

export default LogOutButton;
