import { useParams } from "react-router-dom";

import "./ChatRoom.css";

const ChatRoom = () => {
  const params = useParams();

  return <div className="chat-room">{params.roomName}</div>;
};
export default ChatRoom;
