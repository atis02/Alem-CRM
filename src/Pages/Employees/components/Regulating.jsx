import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, Typography, IconButton, Stack } from "@mui/material"; // Импортируйте необходимые компоненты из MUI

const HOST = "http://192.168.1.46"; // server API
// const HOST = "http://localhost"; // local API

const getChatUsersIO = async (userId) => {
  const response = await fetch(`${HOST}/api/chat/chats/${userId}`, {
    method: "GET",
    // credentials: 'include', // Включаем учетные данные
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch chat users");
  }
  const data = await response.json();
  return data;
};

const getUsersChatApiIO = async (id) => {
  const response = await fetch(`${HOST}/api/chat/users/${id}`, {
    method: "GET",
    // credentials: 'include', // Для включения учетных данных
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users chat");
  }

  const data = await response.json();
  return data;
};

// const socket = io("http://localhost:5022");
// const socket = io("http://192.168.1.46:5022");  //ishleyan url
const socket = io(`${HOST}:5022`);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Regulating = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("userId")
  );
  const [recipient, setRecipient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const ID = Number(sessionStorage.getItem("userId"));

  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const [chatId, setChatId] = useState(null);

  const [oppositeSenderId, setOppositeSenderId] = useState(null);
  const [oppositeReceiverId, setOppositeReceiverId] = useState(null);
  const [oppositeChatId, setOppositeChatId] = useState(null);
  const [selectChatHistory, setSelectChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userChats = async () => {
      const tempChats = await getChatUsersIO(ID);
      setChats(tempChats);
    };
    userChats();
  }, []);
  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      const temp = await getUsersChatApiIO(ID);
      setUsers(temp.users);
      setChats(temp.chats);
    };
    fetchUsers();

    // Регистрация текущего пользователя
    socket.emit("register", currentUser);
    socket.on("message", (data) => {
      const { senderId, receiverId, text } = data;
      setSelectChatHistory((prevMessages) => [
        ...prevMessages,
        { senderId: Number(senderId), receiverId, text },
      ]);
    });
    return () => socket.off("message");
  }, [currentUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectChatHistory]);

  const createChat = async (senderId, receiverId) => {
    socket.emit("createchat", { senderId, receiverId });
    const temp = await getUsersChatApiIO(ID);
    setUsers(temp.users);
    setChats(temp.chats);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && recipient) {
      socket.emit("message", {
        senderId: currentUser,
        recipientId: recipient,
        message,
        chatId,
        oppositeChatId,
        oppositeSenderId,
        oppositeReceiverId,
      });
      setMessage("");
    }
  };

  const getChats = (senderId, chatId) => {
    socket.emit("getchat", { chatId, senderId });
    socket.on("getchat", (data) => {
      const { chatHistory } = data;
      setSelectChatHistory(chatHistory);
    });
    return () => socket.off("getchat");
  };

  const selectChat = (
    recipient,
    name,
    chatId,
    oppositeSenderId,
    oppositeReceiverId,
    oppositeChatId,
    receiverId,
    senderId
  ) => {
    setRecipient(recipient);
    setName(name);
    setChatId(chatId);
    setOppositeSenderId(oppositeSenderId);
    setOppositeReceiverId(oppositeReceiverId);
    setOppositeChatId(oppositeChatId);
    setReceiverId(receiverId);
    getChats(senderId, chatId);
  };

  const createChatWithUser = (userId, userName, Id) => {
    setRecipient(userId);
    setName(userName);
    createChat(Id, userId);
    setShowModal(false);
  };
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="auto"
      p="10px"
    >
      <div className="chat-container">
        <IconButton className="iconIoAdd" onClick={() => setShowModal(true)}>
          +
        </IconButton>
        <div className="chat-header">
          <h2>
            Chat<span>{": " + name}</span>
          </h2>
        </div>

        <div className="chat-body">
          {/* <div className="chat-users">
                    <h3>Users</h3>
                    <ul>
                        {!chats ? "Does not have chats" : chats.map(user => (
                            <li key={user.id} onClick={() => selectChat(user.id,
                                user.name,
                                user.chatId,
                                user.oppositeSenderId,
                                user.oppositeReceiverId,
                                user.oppositeChatId,
                                user.receiverId,
                                user.senderId)}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div> */}
          <Stack></Stack>
          <div className="chat-messages">
            <h3>Messages</h3>
            <ul>
              {selectChatHistory.map((msg, index) => (
                <li
                  key={index}
                  style={{ textAlign: msg.senderId === ID ? "right" : "left" }}
                >
                  <div
                    className="chat-messages__div"
                    style={{
                      backgroundColor:
                        msg.senderId === ID ? "#D0E7FF" : "#D4F8E8",
                    }}
                  >
                    <b className="chat-messages__div-b">
                      {msg.senderId === ID ? "" : name}
                    </b>
                    <span className="chat-messages__div-span">{msg.text}</span>
                  </div>
                </li>
              ))}
              <div ref={messagesEndRef} />
              {/* Ссылка для автоматической прокрутки вниз */}
            </ul>
            <div className="chat-input">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
        {/* Используем MUI Modal */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Ulanyjy saýlaň
            </Typography>
            <div className="chat-users">
              <ul>
                {users.map((user) => (
                  <li
                    onClick={() =>
                      createChatWithUser(
                        user.id,
                        user.name,
                        sessionStorage.getItem("userId")
                      )
                    }
                    key={user.id}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Regulating;
