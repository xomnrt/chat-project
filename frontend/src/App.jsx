import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./components/Router.jsx";

import store from "./slices/index.js";
import { Provider } from 'react-redux';
import {ChatApiProvider} from './contexts/ChatApiProvider.jsx';
import {AuthProvider} from './contexts/AuthProvider.jsx';
import { io } from 'socket.io-client';

import './locales/index.js';

const App = () => {

  const socket = io('/', { autoConnect: false });

  return (
    <Provider store={store}>
      <AuthProvider>
        <ChatApiProvider>
          <Router />
        </ChatApiProvider>
      </AuthProvider>
    </Provider>
  )

}

export default App;
