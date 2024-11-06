import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { I18nextProvider } from 'react-i18next';
import LeoProfanity from 'leo-profanity';
import Router from './components/Router.jsx';

import store from './slices/index.js';
import { ChatApiProvider } from './contexts/ChatApiProvider.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';

import i18next from './locales/index.js';

const App = () => {
  const socket = io('/', { autoConnect: false });

  const censorship = LeoProfanity;
  censorship.add(censorship.getDictionary('ru'));
  censorship.add(censorship.getDictionary('en'));

  return (
    <I18nextProvider i18n={i18next} defaultNS="translation">
      <Provider store={store}>
        <AuthProvider>
          <ChatApiProvider socket={socket}>
            <Router />
          </ChatApiProvider>
        </AuthProvider>
      </Provider>
    </I18nextProvider>

  );
};

export default App;
