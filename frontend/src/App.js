import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import ChatProvider from './Context/ChatProvider';

function App() {
  return (
    <div className="App">
      <ChatProvider>
      <Route exact path= '/' component={Homepage} />
      <Route exact path= '/chats' component={ChatPage} />
      </ChatProvider>
    </div>
  );
}

export default App;
