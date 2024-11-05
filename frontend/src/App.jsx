import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './components/Router.jsx';

import store from "./slices/index.js";
import { Provider } from 'react-redux';
import {ChatApiProvider} from './contexts/ChatApiProvider.jsx';
import { AuthProvider} from './contexts/AuthProvider.jsx';
import { io } from 'socket.io-client';

import { I18nextProvider } from 'react-i18next';
import i18next from './locales/index.js';
import LeoProfanity from 'leo-profanity';

const App = () => {

  const socket = io('/', { autoConnect: false });

  const censorship = LeoProfanity;
  censorship.loadDictionary('ru');
  censorship.loadDictionary('en');

  return (
  <I18nextProvider i18n={i18next} defaultNS={'translation'}>
    <Provider store={store}>
      <AuthProvider>
        <ChatApiProvider socket={socket}>
          <Router />
        </ChatApiProvider>
      </AuthProvider>
    </Provider>
    </I18nextProvider>

  )

}

export default App;
