import React, { useRef, useState } from "react";

import CreateRoomModal from "../../components/Modal/CreateRoomModal";
import EnterRoomModal from "../../components/Modal/EnterRoomModal";
import chatBubbleIcon from "../../assets/images/chat_bubble.svg";
import socket from "../../socket";
import "./Home.css";

const Home = () => {
  const [clickedRoomName, setClickedRoomName] = useState("");

  const modalRefs = {
    createRoomModalRef: useRef(null),
    enterRoomModalRef: useRef(null),
  };

  const showModalHandler = (props) => {
    // 방 생성 모달
    if (!props) {
      modalRefs.createRoomModalRef.current.showModal();
      return;
    }
    // 방 입장 모달
    setClickedRoomName(props);
    modalRefs.enterRoomModalRef.current.showModal();
    return;
  };

  const hideModalHandler = () => {
    Object.values(modalRefs).forEach((ref) => {
      if (ref.current) ref.current.close();
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="home">
      <img
        src={chatBubbleIcon}
        width={200}
        height={125}
        alt="chat bubble icon"
      />

      <h2>Socket.io를 이용한 채팅 웹앱</h2>

      <button className="create-room-button" onClick={() => showModalHandler()}>
        새로운 채팅방 만들기
      </button>

      <section className="section-join-chat">
        <h3>아래 채팅방에 참여해보세요🙋🏻‍♀️</h3>
        <h4 className="room-list">
          채팅방 목록 <span className="room-length">(0/3)</span>
        </h4>

        <ul className="chat-room-list">
          <li>
            <button onClick={() => showModalHandler("roomName")}>
              채팅방 1 (0/3)
            </button>
          </li>
        </ul>
      </section>

      <CreateRoomModal
        modalRef={modalRefs.createRoomModalRef}
        onCancel={hideModalHandler}
        onSubmit={onSubmitHandler}
      />
      <EnterRoomModal
        modalRef={modalRefs.enterRoomModalRef}
        onCancel={hideModalHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};
export default Home;
