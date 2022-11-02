import { useHistory } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);  

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // console.log(userInfo);
    // console.log(user);
    // console.log('hello');
    // console.log(history);

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  const updateUser = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history.push("/");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
