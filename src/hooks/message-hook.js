import { useState, useCallback } from "react";
import socket from "../socket";

export const useMessage = () => {
  const [messageList, setMessageList] = useState([]);

  const addSystemMessage = useCallback(async (namespace, user) => {
    let message_content;

    switch (namespace) {
      case "welcome":
        message_content = `${user} 님이 입장했습니다!`;
        break;
      case "bye":
        message_content = `${user} 님이 퇴장했습니다 ㅠㅠ!`;
        break;

      default:
        break;
    }

    const new_msg = {
      type: "system",
      message: message_content,
    };
    setMessageList((pre) => [...pre, new_msg]);
  }, []);

  const addChatMessage = useCallback(async (msg) => {
    const new_msg = {
      type: "chat",
      userName: msg.userName,
      message: msg.message,
      isMe: socket.id === msg.socketId,
      timestemp: new Date().getTime(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessageList((pre) => [...pre, new_msg]);
  }, []);

  return {
    addSystemMessage,
    addChatMessage,
    messageList,
  };
};
