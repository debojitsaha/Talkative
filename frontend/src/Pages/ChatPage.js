import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  
   const {user} = ChatState()
  //  console.log(user);

  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer />}
      <Box display='flex' w='100%' p='10px' height='91.5vh' justifyContent='space-between' >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
        
    </div>
  )
};

export default ChatPage;
