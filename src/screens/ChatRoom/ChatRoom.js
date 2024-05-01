import { useRef, useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { useMessage } from "../../hooks/message-hook";
import { useError } from "../../hooks/error-hook";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import InputField from "../../components/InputField/InputField";
import IconButton from "../../components/Button/IconButton";
import arrowLeftIcon from "../../assets/images/i_arrow_left.svg";
import peopleIcon from "../../assets/images/i_people.svg";
import closeIcon from "../../assets/images/i_close.svg";
import socket from "../../socket";
import "./ChatRoom.css";

const ChatRoom = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const messageInputRef = useRef(null);
  const hiddenInputRef = useRef(null);
  const [userList, setUserList] = useState([]);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { addSystemMessage, addChatMessage, messageList } = useMessage();
  const { errorHandler } = useError();

  useEffect(() => {
    const roomInfo = location?.state?.roomInfo;
    if (roomInfo) socket.emit("entered_room", roomInfo);
  }, [location?.state?.roomInfo]);

  // 채팅방 유저 입/퇴장시 유저 업데이트
  const updateUsers = useCallback(async (type, user) => {
    if (type === "welcome") {
      setUserList(user);
      return;
    }
    if (type === "bye") {
      setUserList((pre) => pre.filter((item) => item.nickname !== user));
      return;
    }
  }, []);

  // 유저 채팅방 입장시: UI 업데이트
  useEffect(() => {
    socket.on("welcome", async (user) => {
      // console.log("welcome user -------------->", user);
      await addSystemMessage("welcome", user.nickname);
      await updateUsers("welcome", user.users);
    });

    return () => {
      socket.off("welcome");
    };
  }, [addSystemMessage, updateUsers]);

  // 유저 채팅방 퇴장시: UI 업데이트
  useEffect(() => {
    socket.on("bye", (userName) => {
      addSystemMessage("bye", userName);
      updateUsers("bye", userName);
    });

    return () => {
      socket.off("bye");
    };
  }, [addSystemMessage, updateUsers]);

  // 채팅방 퇴장
  const leaveRoomHandler = useCallback(() => {
    socket.emit("leave_room", params.roomName);
    navigate("/");
  }, [navigate, params.roomName]);

  // 브라우저 뒤로가기 버튼 클릭시 채팅방 나가기
  useEffect(() => {
    const clickedBackspaceToLeaveRoom = (event) => {
      if (event.type === "popstate") {
        leaveRoomHandler();
      }
    };
    window.addEventListener("popstate", (event) => {
      clickedBackspaceToLeaveRoom(event);
    });
    return () => {
      window.removeEventListener("popstate", clickedBackspaceToLeaveRoom);
    };
  }, [leaveRoomHandler]);

  // 메시지 전송/수신시: UI 업데이트
  useEffect(() => {
    socket.on("new_message", (msg) => {
      addChatMessage(msg);
    });

    return () => {
      socket.off("new_message");
    };
  }, [addChatMessage]);

  useEffect(() => {
    socket.on("error", (error) => {
      errorHandler(error);
    });

    return () => {
      socket.off("error", errorHandler);
    };
  }, [errorHandler]);

  // 메시지 전송
  const handleMessageSubmit = (event) => {
    event.preventDefault();

    const message_value = messageInputRef.current.value;

    if (message_value.trim().length === 0) {
      return;
    }

    const message = {
      roomName: params.roomName,
      senderId: socket.id,
      message: message_value,
    };

    socket.emit("new_message", message);

    messageInputRef.current.value = "";
    hiddenInputRef.current.focus();
    messageInputRef.current.focus();
  };

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  console.log("messageList -------->", messageList);
  console.log("userList -------->", userList);

  return (
    <div className="chat-room">
      <div className="room-head">
        <IconButton
          onClick={leaveRoomHandler}
          iconSrc={arrowLeftIcon}
          alt="go back"
        >
          go back
        </IconButton>
        <h2 className="room-name">
          <span>({userList.length})</span>
          <span>{params.roomName}</span>
        </h2>
        <IconButton
          onClick={openDrawerHandler}
          iconSrc={peopleIcon}
          alt="participants"
        >
          participants
        </IconButton>
      </div>
      <div className="chat-list">
        {messageList.map((message, index) => {
          if (message.type === "system") {
            return (
              <div key={index} className="system-message-bubble">
                <p className="system-message">{message.message}</p>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className={[
                  "message-bubble",
                  `${
                    message.isMe
                      ? "chat-message-from-self-bubble"
                      : "chat-message-from-other-bubble"
                  }`,
                ].join(" ")}
              >
                <span className="sender-name">{message.userName}</span>
                <div className="message-wrap">
                  <span className="message-time">{message.time}</span>
                  <p className="chat-message">{message.message}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <InputField
        name="messageInput"
        onSubmit={handleMessageSubmit}
        inputRef={messageInputRef}
        hiddenInputRef={hiddenInputRef}
      />

      <SideDrawer show={drawerIsOpen}>
        <div className="drawer-header">
          <span>채팅방 유저 목록</span>

          <IconButton
            onClick={closeDrawerHandler}
            iconSrc={closeIcon}
            alt="close drawer"
          >
            close
          </IconButton>
        </div>
        <ul>
          {userList.map((user) => {
            return (
              <li key={user.id} className="drawer-username">
                {user.id === socket.id && (
                  <span className="drawer-label-me">Me</span>
                )}
                {user.nickname}
              </li>
            );
          })}
        </ul>
      </SideDrawer>
      <div id="make-scrollable"></div>
    </div>
  );
};
export default ChatRoom;
