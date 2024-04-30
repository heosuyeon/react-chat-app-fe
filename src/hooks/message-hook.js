import { useState, useCallback } from "react";

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
    };

    setMessageList((pre) => [...pre, new_msg]);
  }, []);

  return {
    addSystemMessage,
    addChatMessage,
    messageList,
  };
};
