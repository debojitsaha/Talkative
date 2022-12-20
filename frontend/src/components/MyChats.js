import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getChatUser, getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import groupdefaultdp from "../assets/groupdefaultdp.png";

const MyChats = ({ fetchAgain, setFetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchChats = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setLoading(false);
      // console.log(chats);
      // console.log(data);
      // console.log(chats);
    } catch (error) {
      // console.log(error);
      toast({
        title: "Error Occured",
        description: "Failed to load the chats",
        duration: 2000,
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // setFetchAgain(false);
    // console.log(selectedChat);
    // console.log(chats);
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight={"black"}>My Chats</Text>
        <GroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats && !loading ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                display="flex"
              >
                <Avatar
                  my="2px"
                  mr={2}
                  name={
                    !chat.isGroupChat
                      ? getChatUser(loggedUser, chat.users).name
                      : chat.chatName
                  }
                  src={
                    !chat.isGroupChat
                      ? getChatUser(loggedUser, chat.users).pic
                      : groupdefaultdp
                  }
                />
                <Box>
                  <Text
                    fontWeight={"medium"}
                    fontSize={{ base: "18px", md: "20px" }}
                  >
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                    {/* {console.log(chat)} */}
                  </Text>
                  {chat.latestMessage && (
                    <Text color={selectedChat === chat ? "#f1dfdf" : "#434242"}>
                      {!chat.isGroupChat
                        ? chat.latestMessage.content
                        : `${chat.latestMessage.sender.name} : ${chat.latestMessage.content}`}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
