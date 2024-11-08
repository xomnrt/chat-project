import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider.jsx';

const LogOutButton = () => {
  const { t } = useTranslation();

  const authContext = useContext(AuthContext);

  return (
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={authContext.logOut}>{t('interface.logout')}</button>
  );
};

export default LogOutButton;
