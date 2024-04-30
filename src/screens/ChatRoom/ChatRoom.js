import { useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useMessage } from "../../hooks/message-hook";
import { useError } from "../../hooks/error-hook";
import InputField from "../../components/InputField/InputField";
import IconButton from "../../components/Button/IconButton";
import arrowLeftIcon from "../../assets/images/i_arrow_left.svg";
import peopleIcon from "../../assets/images/i_people.svg";
import socket from "../../socket";
import "./ChatRoom.css";

const ChatRoom = () => {
  const params = useParams();
  const location = useLocation();
  const messageInputRef = useRef(null);
  const { addSystemMessage, addChatMessage, messageList } = useMessage();
  const { errorHandler } = useError();

  useEffect(() => {
    const roomInfo = location?.state?.roomInfo;
    if (roomInfo) socket.emit("entered_room", roomInfo);
  }, [location?.state?.roomInfo]);

  // 유저 채팅방 입장시: UI 업데이트
  useEffect(() => {
    socket.on("welcome", async (user) => {
      // console.log("welcome user -------------->", user);
      await addSystemMessage("welcome", user.nickname);
    });

    return () => {
      socket.off("welcome");
    };
  }, [addSystemMessage]);

  // 유저 채팅방 퇴장시: UI 업데이트
  useEffect(() => {
    socket.on("bye", (userName) => {
      addSystemMessage("bye", userName);
    });

    return () => {
      socket.off("bye");
    };
  }, [addSystemMessage]);

  useEffect(() => {
    socket.on("error", (error) => {
      errorHandler(error);
    });

    return () => {
      socket.off("error", errorHandler);
    };
  }, [errorHandler]);

  return (
    <div className="chat-room">
      <div className="room-head">
        <IconButton onClick={() => {}} iconSrc={arrowLeftIcon} alt="go back">
          go back
        </IconButton>
        <h2 className="room-name">
          <span>{params.roomName}</span>
        </h2>
        <IconButton onClick={() => {}} iconSrc={peopleIcon} alt="participants">
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
              <div key={index} className="chat-message-bubble">
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
        onSubmit={() => {}}
        inputRef={messageInputRef}
      />
    </div>
  );
};
export default ChatRoom;
