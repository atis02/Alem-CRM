import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Avatar,
  TextField,
} from "@mui/material"; // Импортируйте необходимые компоненты из MUI
import moment from "moment";
import search from "../../../public/images/Search (1).png";

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
  const [name, setName] = useState({ name: "", surname: "", img: "" });
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [recipient, setRecipient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const ID = Number(currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const [chatId, setChatId] = useState(null);

  const [oppositeSenderId, setOppositeSenderId] = useState(null);
  const [oppositeReceiverId, setOppositeReceiverId] = useState(null);
  const [oppositeChatId, setOppositeChatId] = useState(null);
  const [selectChatHistory, setSelectChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  //   const user = JSON.parse(localStorage.getItem("CRM_USER"));

  const filteredUsers = chats.length
    ? chats.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : chats;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("CRM_USER"));
    setCurrentUser(user.id);
  }, [currentUser]);

  useEffect(() => {
    const userChats = async () => {
      const tempChats = await getChatUsersIO(currentUser);
      setChats(tempChats);
    };
    userChats();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const temp = await getUsersChatApiIO(currentUser);
      setUsers(temp.users);
      setChats(temp.chats);
      inputRef.current && inputRef.current.focus();
    };
    fetchUsers();

    // Регистрация текущего пользователя
    socket.emit("register", currentUser);
    socket.on("message", (data) => {
      const { senderId, receiverId, text } = data;

      setSelectChatHistory((prevMessages) => [
        ...prevMessages,
        { senderId: Number(currentUser), receiverId, text },
      ]);
    });
    return () => socket.off("message");
  }, [currentUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      inputRef.current && inputRef.current.focus();
    }
  }, [selectChatHistory]);

  const createChat = async (senderId, receiverId) => {
    socket.emit("createchat", { senderId, receiverId });
    const temp = await getUsersChatApiIO(currentUser);
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
    inputRef.current && inputRef.current.focus();
    return () => socket.off("getchat");
  };

  const selectChat = (
    recipient,
    name,
    surname,
    img,
    chatId,
    oppositeSenderId,
    oppositeReceiverId,
    oppositeChatId,
    receiverId,
    senderId
  ) => {
    setRecipient(recipient);
    setName({ name: name, surname: surname, img: img });
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
      backgroundColor="#F5F6FA"
      overflow="auto"
      p="10px"
    >
      <div className="chat-container">
        {/* <IconButton className="iconIoAdd" onClick={() => setShowModal(true)}>
          +
        </IconButton> */}
        {/* <div className="chat-header">
          <h2>
            Chat<span>{": " + name}</span>
          </h2>
        </div> */}

        <div className="chat-body">
          {/* <div className="chat-users">
            <h3>Users</h3>
            <ul>
              {chats.length == 0
                ? "Does not have chats"
                : chats.map((user) => (
                    <li
                      key={user.id}
                      onClick={() =>
                        selectChat(
                          user.id,
                          user.name,
                          user.chatId,
                          user.oppositeSenderId,
                          user.oppositeReceiverId,
                          user.oppositeChatId,
                          user.receiverId,
                          user.senderId
                        )
                      }
                    >
                      {user.name}
                    </li>
                  ))}
            </ul>
          </div> */}
          <Stack
            width="30%"
            height="100%"
            borderRadius="7px"
            backgroundColor="#f0f0f0"
          >
            <Stack spacing={1} justifyContent="center">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacin={2}
                width="100%"
                sx={{
                  p: { lg: "15px 5px 0 10px", xs: "0 5px 0 5px" },
                  gap: "5px",
                }}
              >
                <TextField
                  id="input-with-icon-textfield"
                  placeholder="Gözle..."
                  fullWidth
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  sx={
                    {
                      // width: { lg: "90%", md: "90%", sm: "90%", xs: "90%" },
                    }
                  }
                  InputProps={{
                    startAdornment: (
                      <img
                        src={search}
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: 10,
                        }}
                        alt=""
                      />
                    ),
                    sx: {
                      transition: "all ease-in-out 0.2s",
                      borderRadius: "35px",
                      backgroundColor: "#fff",
                      height: "45px",
                      color: "#000",
                      fontWeight: "600",
                      outline: "none",
                      boxShadow: "none",
                    },
                    inputProps: {
                      sx: {
                        "&::placeholder": {
                          color: "#d5dd5", // Set the placeholder color
                          fontWeight: 400,
                          fontSize: 16,
                        },
                      },
                    },
                  }}
                  variant="outlined"
                />
                <IconButton
                  onClick={() => setShowModal(true)}
                  sx={{
                    width: "45px",
                    height: "45px",
                    border: "0.5px solid #cdcdcd",
                    color: "#fff",
                    background: "#9FC2A6",
                    "&:hover": { background: "#9FC2A6" },
                  }}
                >
                  +
                </IconButton>
              </Stack>
              {chats.length == 0
                ? "Does not have chats"
                : filteredUsers.map((user, index) => (
                    <Stack
                      key={index}
                      onClick={() =>
                        selectChat(
                          user.id,
                          user.name,
                          user.surname,
                          user.img,
                          user.chatId,
                          user.oppositeSenderId,
                          user.oppositeReceiverId,
                          user.oppositeChatId,
                          user.receiverId,
                          user.senderId
                        )
                      }
                      direction="row"
                      spacing={2}
                      p="8px"
                      sx={{
                        ...(index == 0
                          ? { borderTop: "1px solid #CDCDCD" }
                          : ""),
                        borderBottom: "1px solid #CDCDCD",
                        "&:hover": { backgroundColor: "#F5F5F5" },
                      }}
                    >
                      {user.img ? (
                        <img
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: "100px",
                          }}
                          src={`http://192.168.1.46/images/${user.img}`}
                          alt=""
                        />
                      ) : (
                        <Avatar
                          sx={{
                            width: 45,
                            height: 45,
                            background: "#9FC2A6",
                          }}
                        />
                      )}

                      <Stack
                        sx={{
                          cursor: "pointer",
                        }}
                        height={45}
                        width="90%"
                        justifyContent="center"
                      >
                        <Typography
                          fontFamily="Montserrat"
                          color="#4399FF"
                          fontWeight={600}
                        >
                          {user.name} {user.surname}
                        </Typography>
                        <Typography color="#959595"></Typography>
                      </Stack>
                    </Stack>
                  ))}
            </Stack>
          </Stack>
          <div
            className="chat-messages"
            style={{ position: "relative", background: "#fff", height: "100%" }}
          >
            {name.name == "" ? (
              <Typography
                fontFamily="Montserrat"
                color="#cdcdcd"
                mt={6}
                fontSize={30}
                textAlign="center"
                fontWeight={600}
              >
                Söhbetdeşlik saýlaň
              </Typography>
            ) : (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  boxShadow=" 0px 12px 7px -14px rgba(71,71,71,1)"
                  p={1}
                >
                  {name.img != null ? (
                    <img
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "100px",
                      }}
                      src={`http://192.168.1.46/images/${name.img}`}
                      alt=""
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 45,
                        height: 45,
                        background: "#9FC2A6",
                      }}
                    />
                  )}
                  <Typography fontSize={18} fontWeight={500} color="#4399FF">
                    {name.name} {name.surname}
                  </Typography>
                </Stack>

                <ul style={{ height: "500px !important" }}>
                  {selectChatHistory.map((msg, index) => (
                    <li
                      key={index}
                      style={{
                        textAlign: msg.senderId === ID ? "right" : "left",
                      }}
                    >
                      <div
                        className="chat-messages__div"
                        style={{
                          backgroundColor:
                            msg.senderId === ID ? "#D0E7FF" : "#D4F8E8",
                          position: "relative",
                          alignItems: "center",
                        }}
                      >
                        <b className="chat-messages__div-b">
                          {msg.senderId === ID ? "" : name.name}
                        </b>
                        <Stack
                          width="100%"
                          spacing={2}
                          direction="row"
                          alignItems="end"
                          justifyContent="space-between"
                        >
                          <span className="chat-messages__div-span">
                            {msg.text}{" "}
                          </span>
                          <span
                            style={{
                              color: "gray",
                              fontSize: 11,
                              marginBottom: "-4px",
                            }}
                          >
                            {moment(msg.createdAt).format("HH:mm")}
                          </span>
                        </Stack>
                      </div>
                    </li>
                  ))}
                  <div ref={messagesEndRef} />
                  {/* Ссылка для автоматической прокрутки вниз */}
                </ul>
                <Stack
                  className="chat-input"
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: "2%",
                    width: "95%",
                    alignItems: "center",
                  }}
                >
                  <form onSubmit={sendMessage}>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Tekst..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                  </form>
                </Stack>
              </>
            )}
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
                {users.map((chatUser) => (
                  <li
                    onClick={() =>
                      createChatWithUser(
                        chatUser.id,
                        chatUser.name,
                        currentUser
                      )
                    }
                    key={chatUser.id}
                  >
                    {chatUser.name}
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
