import React from "react";

import chatBubbleIcon from "../../assets/images/chat_bubble.svg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <img
        src={chatBubbleIcon}
        width={200}
        height={125}
        alt="chat bubble icon"
      />

      <h2>Socket.io를 이용한 채팅 웹앱</h2>

      <button className="create-room-button" onClick={() => {}}>
        새로운 채팅방 만들기
      </button>

      <section className="section-join-chat">
        <h3>아래 채팅방에 참여해보세요🙋🏻‍♀️</h3>
        <h4 className="room-list">
          채팅방 목록 <span className="room-length">(0/3)</span>
        </h4>

        <ul className="chat-room-list">
          <li>
            <button onClick={() => {}}>채팅방 1 (0/3)</button>
          </li>
        </ul>
      </section>
    </div>
  );
};
export default Home;
