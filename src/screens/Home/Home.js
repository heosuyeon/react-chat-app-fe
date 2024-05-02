import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useError } from "../../hooks/error-hook";
import CreateRoomModal from "../../components/Modal/CreateRoomModal";
import EnterRoomModal from "../../components/Modal/EnterRoomModal";
import chatBubbleIcon from "../../assets/images/chat_bubble.svg";
import socket from "../../socket";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState([]);
  const [clickedRoomName, setClickedRoomName] = useState("");
  const { errorHandler } = useError();

  const modalRefs = {
    createRoomModalRef: useRef(null),
    enterRoomModalRef: useRef(null),
  };

  useEffect(() => {
    socket.on("room_change", (room) => {
      setRoomList(room);
    });
    return () => {
      socket.off("room_change");
    };
  }, [roomList]);

  useEffect(() => {
    socket.on("error", (error) => {
      errorHandler(error);
    });
    return () => {
      socket.off("error", errorHandler);
    };
  }, [errorHandler]);

  const showModalHandler = (props) => {
    // 방 생성 모달
    if (!props.roomName) {
      modalRefs.createRoomModalRef.current.showModal();
      return;
    }
    // 방 입장 모달
    setClickedRoomName(props.roomName);
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

    if (!socket.connected) {
      alert(
        "서버가 정지되었습니다. 현재 클라우드타입 무료 요금제 사용중이며 하루에 한 번 서버가 정지됩니다. 기능 확인은 Github readme를 확인해 주세요."
      );
      return;
    }

    const formData = new FormData(event.target);
    const roomName = formData.get("roomName")
      ? formData.get("roomName")
      : clickedRoomName;
    const userName = formData.get("userName");

    const roomInfo = {
      roomName,
      userName,
      id: socket.id,
    };
    console.log("onSubmitHandler roomInfo ----->", roomInfo);

    socket.emit("enter_room", roomInfo, () => {
      // 서버에서 검증을 마친 후에 navigate
      navigate(`/chat_room/${roomInfo.roomName}`, { state: { roomInfo } });
    });
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

      <button className="create-room-button" onClick={showModalHandler}>
        새로운 채팅방 만들기
      </button>

      {roomList.length > 0 && (
        <section className="section-join-chat">
          <h3>아래 채팅방에 참여해보세요🙋🏻‍♀️</h3>
          <h4 className="room-list">
            채팅방 목록
            <span className="room-length">({roomList.length}/3)</span>
          </h4>

          <ul className="chat-room-list">
            {roomList.map((room) => {
              return (
                <li key={room.roomName} onClick={() => showModalHandler(room)}>
                  <button>
                    {room.roomName} ({room.userCount}/3)
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

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
