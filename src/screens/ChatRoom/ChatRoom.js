import { useRef } from "react";
import { useParams } from "react-router-dom";

import InputField from "../../components/InputField/InputField";
import IconButton from "../../components/Button/IconButton";
import arrowLeftIcon from "../../assets/images/i_arrow_left.svg";
import peopleIcon from "../../assets/images/i_people.svg";
import "./ChatRoom.css";

const ChatRoom = () => {
  const params = useParams();
  const messageInputRef = useRef(null);

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
      <div className="chat-list"></div>
      <InputField
        name="messageInput"
        onSubmit={() => {}}
        inputRef={messageInputRef}
      />
    </div>
  );
};
export default ChatRoom;
